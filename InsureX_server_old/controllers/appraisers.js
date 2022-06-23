const express = require("express")
const router = express.Router()
const pool = require("../db/pool.js")

const appraisersController = {
    async getAllAppraisers(req, res) {
        const { rows: appraisers } = req.query.insuranceCompanyId ?
            await pool.query(`SELECT * FROM appraisers WHERE insurance_company_id = '${req.query.insuranceCompanyId}'`)
            :
            await pool.query("SELECT * FROM appraisers")

        for (let appraiser of appraisers) {
            console.log(appraiser.insurance_company_id)
            const { rows: [insuranceCompany] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${appraiser.insurance_company_id}`)
            appraiser.insurance_company = insuranceCompany
        }

        for (let appraiser of appraisers) {
            const { rows: [region] } = await pool.query(`SELECT * FROM regions WHERE id = ${appraiser.region_id}`)
            appraiser.region = region
        }

        for (let appraiser of appraisers) {
            const { rows: [appraisalCompany] } = await pool.query(`SELECT * FROM appraisal_companies WHERE id = ${appraiser.appraisal_company_id}`)
            appraiser.appraisal_company = appraisalCompany
        }

        res.send({ appraisers })
    },
    async getAppraiserById(req, res) {
        const id = req.params.id
        console.log(id)
        const { rows: [appraisers] } = await pool.query(`SELECT * FROM appraisers WHERE id = ${id}`)
        console.log(appraisers)
        res.send({ appraisers })
    },
    async createAppraiser(req, res) {
        const appraiser = req.fields
        console.log(appraiser)
        const { first_name, second_name, region_id, employee_number, login_id, insurance_company_id, address, phone, email, ooo_number, ie_number, appraisal_company_id } = appraiser
        res.send(pool.query(`
            INSERT INTO appraisers
            (first_name, second_name, address, phone, email, ooo_number, ie_number, region_id, employee_number, login_id, insurance_company_id, appraisal_company_id) VALUES 
            ('${first_name}', '${second_name}', '${address}', '${phone}', '${email}', '${ooo_number}', '${ie_number}', '${region_id}', '${employee_number}', '${login_id}', '${insurance_company_id}', '${appraisal_company_id}') RETURNING *`
        ))
    },
    async updateAppraiser(req, res) {
        const appraisers = req.fields
        const id = req.params.id
        const { first_name, second_name, region_id, employee_number, login_id, insurance_company_id, address, phone, email, ooo_number, appraisal_company_id, ie_number } = appraisers
        console.log(id)
        console.log(appraisers)

        await pool.query(`
            UPDATE appraisers SET
            first_name = '${first_name}', second_name = '${second_name}', address = '${address}', phone = '${phone}', 
            email = '${email}', employee_number = '${employee_number}', region_id = '${region_id}', 
            ooo_number = '${ooo_number}', login_id = '${login_id}', insurance_company_id = '${insurance_company_id}',
            appraisal_company_id = '${appraisal_company_id}', ie_number = '${ie_number}'
            WHERE id = '${id}'`
        )
        res.send(200)
    },
    async deleteAppraiser(req, res) {
        const id = req.params.id
        await pool.query(`DELETE FROM appraisers WHERE id = '${id}'`)
        res.send(200)
    }
}

router.get("", appraisersController.getAllAppraisers)
router.post("", appraisersController.createAppraiser)
router.get("/:id", appraisersController.getAppraiserById)
router.post("/:id", appraisersController.updateAppraiser)
router.delete("/:id", appraisersController.deleteAppraiser)
module.exports = router