const pool = require("../db/pool")
const express = require("express")
const router = express.Router()

const agentsController = {
    async getAllAgents(req, res) {
        console.log(req.query)
        const { rows: agents } = req.query.insuranceCompanyId ?
            await pool.query(`SELECT * FROM agents WHERE insurance_company_ids @> '{${+req.query.insuranceCompanyId}}'`)
            :
            await pool.query("SELECT * FROM agents");

        for (let agent of agents) {
            agent.insurance_companies = []
            for (let i = 0; i < agent.insurance_company_ids.length; i++) {
                const { rows: [insuranceCompany] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${agent.insurance_company_ids[i]}`)
                agent.insurance_companies[i] = {
                    id: agent.insurance_company_ids[i],
                    title: insuranceCompany?.title
                }
            }
        }

        for (let agent of agents) {
            const { rows: [region] } = await pool.query(`SELECT * FROM regions WHERE id = ${agent.region_id}`)
            agent.region = region
        }

        res.send({ agents })
    },
    async getAgentById(req, res) {
        const id = req.params.id
        const { rows: [agent] } = await pool.query(`SELECT * FROM agents WHERE id = ${id}`)
        agent.insurance_companies = []

        for (let i = 0; i < agent.insurance_company_ids.length; i++) {
            const { rows: [insuranceCompanies] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${agent.insurance_company_ids[i]}`)
            agent.insurance_companies[i] = insuranceCompanies
        }
        console.log(agent)
        res.send({ agent })
    },
    async createAgent(req, res) {
        const agent = req.fields
        console.log(agent)
        const { first_name, second_name, region_id, employee_number, login_id, insurance_company_ids, address, phone, email } = agent
        res.send(pool.query(`
            INSERT INTO agents
            (first_name, second_name, address, phone, email, region_id, employee_number, login_id, insurance_company_ids) VALUES 
            ('${first_name}', '${second_name}', '${address}', '${phone}', '${email}', '${region_id}', '${employee_number}', '${login_id}', '{${insurance_company_ids}}') RETURNING *`
        ))
    },
    async updateAgent(req, res) {
        const agent = req.fields
        const id = req.params.id
        const { first_name, second_name, region_id, employee_number, login_id, insurance_companies, address, phone, email } = agent


        await pool.query(`
            UPDATE agents SET
            first_name = '${first_name}', second_name = '${second_name}', address = '${address}', phone = '${phone}', 
            email = '${email}', region_id = '${region_id}', 
            employee_number = '${employee_number}', login_id = '${login_id}', insurance_company_ids = '{${insurance_companies}}'
            WHERE id = '${id}'`
        )
        console.log(id)
        console.log(agent)
        res.send(200)
    },
    async deleteAgent(req, res) {
        const id = req.params.id
        await pool.query(`DELETE FROM agents WHERE id = '${id}'`)
        res.send(200)
    }
}

router.get("", agentsController.getAllAgents)
router.post("", agentsController.createAgent)
router.get("/:id", agentsController.getAgentById)
router.post("/:id", agentsController.updateAgent)
router.delete("/:id", agentsController.deleteAgent)
module.exports = router