const pool = require("../db/pool")
const express = require("express")
const router = express.Router()

const insuranceCompanyController = {
    async getAllInsuranceCompanies(req, res) {
        const { rows: insuranceCompanies } = await pool.query("SELECT * FROM insurance_companies")

        res.send({ insuranceCompanies })
    },
    async getInsuranceCompanyById(req, res) {
        const id = req.params.id
        const { rows: [insuranceCompany] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${id}`)

        const { rows: [user] } = await pool.query(`SELECT * FROM users WHERE login = '${insuranceCompany.title}'`)
        insuranceCompany.password = user.password

        res.send({ insuranceCompany })
    },
    async createInsuranceCompany(req, res) {
        const insuranceCompanyData = req.fields

        const { title, ie_number, address, phone, email, password } = insuranceCompanyData

        const { rows: insuranceCompanies } = await pool.query(`SELECT * FROM insurance_companies WHERE title = '${title}'`)
        if (insuranceCompanies.length) {
            return res.status(404).json({ message: "an insurance company with that name already exists" })
        }

        const { rows: [account] } = await pool.query(`INSERT INTO users (login, role, password) VALUES ('${title}', 'insurance_company', '${password}') RETURNING *`)

        await pool.query(
            `INSERT INTO insurance_companies(title, ie_number, address, phone, email, account_id)
             VALUES ('${title}', ${ie_number}, '${address}', '${phone}', '${email}', '${account.id}')`
        )

        res.status(200).json({ message: "successfully" })
    },
    async updateInsuranceCompany(req, res) {
        const insuranceCompanyData = req.fields
        const id = req.params.id
        const { title, ie_number, address, phone, email, password, account_id } = insuranceCompanyData

        if (password) {
            await pool.query(`UPDATE users SET password = '${password}' WHERE id = '${account_id}'`)
        }

        await pool.query(`UPDATE users SET login = '${title}' WHERE id = '${account_id}'`)


        await pool.query(`
        UPDATE insurance_companies SET
        title = '${title}', ie_number = '${ie_number}', address = '${address}', phone = '${phone}', email = '${email}' 
        WHERE id = '${id}'`
        )


        res.send(200)
    },
    async deleteInsuranceCompany(req, res) {
        const id = req.params.id

        const { rows: agents } = await pool.query("SELECT * FROM agents")
        const { rows: SDP } = await pool.query("SELECT * FROM sdp")

        for (let agent of agents) {
            pool.query(`
                UPDATE agents SET 
                insurance_company_ids = '{${agent.insurance_company_ids.filter(insuranceCompanyId => insuranceCompanyId != id)}}' WHERE id = '${agent.id}'`)
        }

        for (let oneSDP of SDP) {
            pool.query(`UPDATE sdp SET 
            insurance_company_ids = '{${oneSDP.insurance_company_ids.filter(insuranceCompanyId => insuranceCompanyId != id)}}' WHERE id = '${oneSDP.id}'`)
        }


        const { rows: [insuranceCompany] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = '${id}'`)

        await pool.query(`DELETE FROM insurance_companies WHERE id = '${id}'`)
        await pool.query(`DELETE FROM users WHERE id = '${insuranceCompany.account_id}'`)

        res.send(200)
    }
}

router.get("", insuranceCompanyController.getAllInsuranceCompanies)
router.post("", insuranceCompanyController.createInsuranceCompany)
router.get("/:id", insuranceCompanyController.getInsuranceCompanyById)
router.post("/:id", insuranceCompanyController.updateInsuranceCompany)
router.delete("/:id", insuranceCompanyController.deleteInsuranceCompany)

module.exports = router