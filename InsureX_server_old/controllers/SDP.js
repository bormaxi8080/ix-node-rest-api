const pool = require("../db/pool")
const express = require("express")
const router = express.Router()

const SDPController = {
    async getAllSDP(req, res) {
        const { rows: SDP } = req.query.insuranceCompanyId ?
            await pool.query(`SELECT * FROM sdp WHERE insurance_company_ids @> '{${req.query.insuranceCompanyId}}'`)
            :
            await pool.query("SELECT * FROM sdp")
        for (let oneSDP of SDP) {
            oneSDP.insurance_companies = []
            for (let i = 0; i < oneSDP.insurance_company_ids.length; i++) {
                const { rows: insuranceCompanies } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${oneSDP.insurance_company_ids[i]}`)
                oneSDP.insurance_companies[i] = {
                    id: oneSDP.insurance_company_ids[i],
                    title: insuranceCompanies[0]?.title
                }
            }
            const { rows: [region = null] } = await pool.query(`SELECT * FROM regions WHERE id = ${oneSDP.region_id}`)
            oneSDP.region = region
        }

        res.send({ SDP })
    },
    async getSDPById(req, res) {
        const id = req.params.id
        console.log(id)
        const { rows: [SDP] } = await pool.query(`SELECT * FROM sdp WHERE id = ${id}`)
        SDP.insurance_companies = []
        for (let i = 0; i < SDP.insurance_company_ids.length; i++) {
            const { rows: [insuranceCompany] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${SDP.insurance_company_ids[i]}`)
            SDP.insurance_companies[i] = {
                id: SDP.insurance_company_ids[i],
                title: insuranceCompany?.title
            }
        }
        res.send({ SDP })
    },
    async createSDP(req, res) {
        const SDP = req.fields
        const { name, login_id, region_id, insurance_company_ids, address, phone, email } = SDP
        res.json(pool.query(`
            INSERT INTO SDP(insurance_company_ids, name, address, phone, email, region_id, login_id) 
            VALUES ('{${insurance_company_ids}}', '${name}', '${address}', '${phone}', '${email}', '${region_id}', '${login_id}') RETURNING *`
        ))
    },
    async updateSDP(req, res) {
        const SDP = req.fields
        const id = req.params.id
        const { name, login_id, region_id, insurance_company_ids, address, phone, email } = SDP
        console.log(id)
        console.log(SDP)

        pool.query(`
            UPDATE SDP SET
            name = '${name}', region_id = '${region_id}', address = '${address}', phone = '${phone}', email = '${email}',
            insurance_company_ids = '{${insurance_company_ids}}', login_id = '${login_id}' 
            WHERE id = '${id}'`
        )
        res.send(200)
    },
    async deleteSDP(req, res) {
        const id = req.params.id
        await pool.query(`DELETE FROM sdp WHERE id = '${id}'`)

        res.send(200)
    }
}

router.get("", SDPController.getAllSDP)
router.post("", SDPController.createSDP)
router.get("/:id", SDPController.getSDPById)
router.post("/:id", SDPController.updateSDP)
router.delete("/:id", SDPController.deleteSDP)

module.exports = router