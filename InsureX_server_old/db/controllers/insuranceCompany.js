const pool = require("../db/pool")
const express = require("express")
const router = express.Router()

const insuranceCompanyController = {
    async getAllInsureCompanies(_, res) {
        const { rows: insuranceCompanies } = await pool.query("SELECT * FROM insurance_companies")
        res.send({ insuranceCompanies })
    },
    async getInsureCompanyById(req, res) {
        console.log(req)
        const id = req.query.id
        const { rows: insuranceCompany } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${id}`)
        res.send({ insuranceCompany })
    },
    async createInsureCompany(req, res) {
        const insuranceCompany = req.body
        console.log(insuranceCompany)
        const { title, IENumber, address, phone, email } = insuranceCompany
        res.json(pool.query(`INSERT INTO insurance_companies(title, ie_number, address, phone, email) VALUES ('${title}', ${+IENumber}, '${address}', ${+phone}, '${email}') RETURNING *`))
    }
}

router.get("", insuranceCompanyController.getAllInsureCompanies)
router.post("", insuranceCompanyController.createInsureCompany)
router.get(":id", insuranceCompanyController.getInsureCompanyById)

module.exports = router