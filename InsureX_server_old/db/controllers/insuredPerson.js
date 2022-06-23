const express = require("express")
const router = express.Router()
const pool = require("../db/pool.js")

const insuredPersonController = {
    async getAllInsuredPersons(_, res) {
        const { rows: insuredPersons } = await pool.query(`
            SELECT * FROM insured_persons JOIN insurance_companies ON insurend_persons.insurance_company_id = insurance_companies.id`
        )
        res.send({ insuredPersons })
    },
    async getInsuredPersonById(id) {

    },
    async createInsuredPerson(req, res) {
        const insuredPerson = req.body
        console.log(insuredPerson)
        const { firstName, secondName, passpordId, regionId, agentId, loginId, insuranceComapnyId, address, phone, email } = insuredPerson
        res.json(pool.query(`
            INSERT INTO insured_persons
            (first_name, second_name, address, phone, email, passport_id, region_id, agent_id, login_id, insurance_company_id) VALUES 
            ('${firstName}', '${secondName}', '${address}', '${phone}', '${email}', '${passpordId}', ${regionId}, '${agentId}', '${loginId}', '${insuranceComapnyId}') RETURNING *`
        ))
    }
}

router.get("", insuredPersonController.getAllInsuredPersons)
router.post("", insuredPersonController.createInsuredPerson)
module.exports = router