const pool = require("../db/pool")
const express = require("express")
const googleAPI = require("../service/googleDrive")
const router = express.Router()

const insuredEventsController = {
    async getAllInsuredEvents(req, res) {
        const { rows: insuredEvents } = req.query.insuranceCompanyId ?
            await pool.query(`SELECT * FROM insured_events WHERE insurance_company_id = '${req.query.insuranceCompanyId}'`)
            :
            await pool.query("SELECT * FROM insured_events")
        console.log(insuredEvents)

        for (let insuredEvent of insuredEvents) {
            const { rows: [insuranceCompany = null] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${insuredEvent.insurance_company_id}`)
            const { rows: [region = null] } = await pool.query(`SELECT * FROM regions WHERE id = ${insuredEvent.region_id}`)
            const { rows: [insuredPerson = null] } = await pool.query(`SELECT * FROM insured_persons WHERE id = ${insuredEvent.insured_person_id}`)
            const { rows: [appraisalCompany = null] } = await pool.query(`SELECT * FROM appraisal_companies WHERE id = ${insuredEvent.appraisal_company_id}`)
            const { rows: [appraiser = null] } = await pool.query(`SELECT * FROM appraisers WHERE id = ${insuredEvent.appraiser_id}`)
            const { rows: [agent = null] } = await pool.query(`SELECT * FROM agents WHERE id = ${insuredEvent.agent_id}`)

            insuredEvent.insurance_company = insuranceCompany
            insuredEvent.region = region
            insuredEvent.insured_person = insuredPerson
            insuredEvent.appraisal_company = appraisalCompany
            insuredEvent.appraiser = appraiser
            insuredEvent.agent = agent
        }

        res.send({ insuredEvents })
    },
    async getInsuredEventById(req, res) {
        const id = req.params.id
        console.log(id)
        const { rows: [insuredEvent] } = await pool.query(`SELECT * FROM insured_events WHERE id = ${id}`)
        const { rows: files } = await pool.query(`SELECT * FROM insured_events_files WHERE insured_event_id = ${id}`)
        insuredEvent.files = files

        res.send({ insuredEvent })
    },
    async createInsuredEvent(req, res) {
        const insuredEventData = req.fields

        const {
            date, insurance_company_id, garage_name, region_id, insured_person_id, event_type,
            address, agent_id, appraiser_id, insured_event_number
        } = insuredEventData

        const { rows: appraisalCompanies } = await pool.query(`SELECT * FROM appraisal_companies`)
        const { rows: regionAppraisalCompanies } = await pool.query(`SELECT * FROM appraisal_companies WHERE region_id = '${region_id}'`)

        const appraisal_company_id = regionAppraisalCompanies.length ?
            regionAppraisalCompanies[Math.floor(Math.random() * regionAppraisalCompanies.length)].id
            :
            appraisalCompanies[[Math.floor(Math.random() * appraisalCompanies.length)]].id
        console.log(appraisal_company_id)

        const { rows: [insuredEvent] } = await pool.query(
            `INSERT INTO insured_events(
                date, insurance_company_id, address, garage_name, region_id, insured_person_id, event_type,
                agent_id, appraisal_company_id, appraiser_id, insured_event_number) VALUES 
            ('${date}', '${insurance_company_id}', '${address}', '${garage_name}', '${region_id}', '${insured_person_id}',
            '${event_type}', '${agent_id}', '${appraisal_company_id}', '${appraiser_id}', '${insured_event_number}') 
            RETURNING *`
        )

        for (let file of Object.values(req.files)) {
            const { link, id: fileId } = await googleAPI.uploadFile(file)
            console.log(link)
            console.log(fileId)
            await pool.query(`
                INSERT INTO insured_events_files(insured_event_id, link, file_google_drive_id, file_type) 
                VALUES ('${insuredEvent.id}', '${link}', '${fileId}', '${file.type}')
            `)
        }

        res.status(200).json({ message: "created" })
    },
    async updateInsuredEvent(req, res) {
        const insuredEvent = req.fields
        const id = req.params.id
        const {
            date, insurance_company_id, garage_name, region_id, insured_person_id, event_type,
            address, agent_id, appraisal_company_id, appraiser_id, insured_event_number, deleted_files
        } = insuredEvent
        console.log(insuredEvent)
        console.log(req.files)

        for (let deletedFile of JSON.parse(deleted_files)) {
            googleAPI.deleteFile(deletedFile.file_google_drive_id)
            await pool.query(`DELETE FROM insured_events_files WHERE file_google_drive_id = '${deletedFile.file_google_drive_id}'`)
        }

        for (let file of Object.values(req.files)) {
            const { link, id: fileId } = await googleAPI.uploadFile(file)
            console.log(link)
            console.log(fileId)
            await pool.query(`
                INSERT INTO insured_events_files(insured_event_id, link, file_google_drive_id, file_type) 
                VALUES ('${insuredEvent.id}', '${link}', '${fileId}', '${file.type}')
            `)
        }

        await pool.query(`
            UPDATE insured_events SET
            date = '${date}', insurance_company_id = '${insurance_company_id}', address = '${address}', garage_name = '${garage_name}', 
            region_id = '${region_id}', insured_person_id = '${insured_person_id}', event_type = '${event_type}', agent_id = '${agent_id}',
            appraisal_company_id = '${appraisal_company_id}', appraiser_id = '${appraiser_id}', insured_event_number = '${insured_event_number}' 
            WHERE id = '${id}'`
        )
        res.send(200)
    },
    async deleteInsuredEvent(req, res) {
        const id = req.params.id
        await pool.query(`DELETE FROM insured_events WHERE id = '${id}'`)

        res.send(200)
    }
}

router.get("", insuredEventsController.getAllInsuredEvents)
router.post("", insuredEventsController.createInsuredEvent)
router.get("/:id", insuredEventsController.getInsuredEventById)
router.post("/:id", insuredEventsController.updateInsuredEvent)
router.delete("/:id", insuredEventsController.deleteInsuredEvent)

module.exports = router