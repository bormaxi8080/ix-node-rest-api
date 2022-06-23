const express = require("express")
const router = express.Router()
const pool = require("../db/pool.js")

const insuredPersonController = {
    async getAllInsuredPersons(req, res) {
        const { rows: insuredPersons } = req.query.insuranceCompanyId ?
            await pool.query(`SELECT * FROM insured_persons WHERE insurance_company_id = '${req.query.insuranceCompanyId}'`)
            :
            await pool.query("SELECT * FROM insured_persons")

        for (let insuredPerson of insuredPersons) {
            console.log(insuredPerson.insurance_company_id)
            const { rows: [insuranceCompany = null] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${insuredPerson.insurance_company_id}`)
            const { rows: [region = null] } = await pool.query(`SELECT * FROM regions WHERE id = ${insuredPerson.region_id}`)
            const { rows: [agent = null] } = await pool.query(`SELECT * FROM agents WHERE id = ${insuredPerson.agent_id}`)

            insuredPerson.insurance_company = insuranceCompany
            insuredPerson.region = region
            insuredPerson.agent = agent
        }

        res.send({ insuredPersons })
    },
    async getInsuredPersonById(req, res) {
        const id = req.params.id
        console.log(id)
        const { rows: [insuredPerson] } = await pool.query(`SELECT * FROM insured_persons WHERE id = ${id}`)
        console.log(insuredPerson)
        res.send({ insuredPerson })
    },
    async createInsuredPerson(req, res) {
        console.log(req)
        const insuredPerson = req.fields
        console.log(insuredPerson)
        const { first_name, second_name, passport_id, region_id, agent_id, login_id, insurance_company_id, address, phone, email } = insuredPerson
        res.send(pool.query(`
            INSERT INTO insured_persons
            (first_name, second_name, address, phone, email, passport_id, region_id, agent_id, login_id, insurance_company_id) VALUES 
            ('${first_name}', '${second_name}', '${address}', '${phone}', '${email}', '${passport_id}', ${region_id}, '${agent_id}', '${login_id}', '${insurance_company_id}') RETURNING *`
        ))
    },
    async updateInsuredPerson(req, res) {
        const insuredPerson = req.fields
        const id = req.params.id
        const { first_name, second_name, passport_id, region_id, agent_id, login_id, insurance_company_id, address, phone, email } = insuredPerson
        console.log(id)
        console.log(insuredPerson)

        await pool.query(`
            UPDATE insured_persons SET
            first_name = '${first_name}', second_name = '${second_name}', address = '${address}', phone = '${phone}', 
            email = '${email}', passport_id = '${passport_id}', region_id = '${region_id}', 
            agent_id = '${agent_id}', login_id = '${login_id}', insurance_company_id = '${insurance_company_id}'
            WHERE id = '${id}'`
        )
        res.send(200)
    },
    async deleteInsuredPerson(req, res) {
        const id = req.params.id
        await pool.query(`DELETE FROM insured_persons WHERE id = '${id}'`)
        res.send(200)
    }
}

router.get("", insuredPersonController.getAllInsuredPersons)
router.post("", insuredPersonController.createInsuredPerson)
router.get("/:id", insuredPersonController.getInsuredPersonById)
router.post("/:id", insuredPersonController.updateInsuredPerson)
router.delete("/:id", insuredPersonController.deleteInsuredPerson)
module.exports = router