const pool = require("../db/pool")
const express = require("express")
const router = express.Router()

const appraisalCompanyController = {
    async getAllAppraisalCompanies(req, res) {
        const { rows: appraisalCompanies } = req.query.insuranceCompanyId ?
            await pool.query(`SELECT * FROM appraisal_companies WHERE insurance_company_ids @> '{${req.query.insuranceCompanyId}}'`)
            :
            await pool.query("SELECT * FROM appraisal_companies")

        for (let appraisalCompany of appraisalCompanies) {
            appraisalCompany.insurance_companies = []
            for (let i = 0; i < appraisalCompany.insurance_company_ids.length; i++) {
                const { rows: [insuranceCompany] } = await pool.query(`SELECT * FROM insurance_companies WHERE id = ${appraisalCompany.insurance_company_ids[i]}`)
                appraisalCompany.insurance_companies[i] = {
                    id: appraisalCompany.insurance_company_ids[i],
                    title: insuranceCompany.title
                }
            }
        }

        res.send({ appraisalCompanies })
    },
    async getAppraisalCompanyById(req, res) {
        const id = req.params.id
        const { rows: [appraisalCompany] } = await pool.query(`SELECT * FROM appraisal_companies WHERE id = ${id}`)
        res.send({ appraisalCompany })
    },
    async createAppraisalCompany(req, res) {
        const appraisalCompany = req.fields
        const { insurance_company_id, appraisal_company_name, oao_ie_number, phone, email, office_address, region_id } = appraisalCompany
        console.log(appraisalCompany)
        res.json(pool.query(`
            INSERT INTO appraisal_companies("insurance_company_ids", "appraisal_company_name", "oao_ie_number", "phone", "email", "office_address", "region_id")
            VALUES ('{${[insurance_company_id]}}', '${appraisal_company_name}', '${oao_ie_number}', '${phone}', '${email}', '${office_address}', '${region_id}') 
            RETURNING *
         `))
    },
    async updateAppraisalComapany(req, res) {
        const appraisalCompany = req.fields
        const id = req.params.id
        const { insurance_company_id, appraisal_company_name, oao_ie_number, phone, email, office_address } = appraisalCompany
        console.log(id)
        console.log(appraisalCompany)

        pool.query(`
            UPDATE appraisal_companies SET
            insurance_company_ids = '{${[insurance_company_id]}}', appraisal_company_name = '${appraisal_company_name}', 
            office_address = '${office_address}', phone = '${phone}', email = '${email}', "oao_ie_number" = '${oao_ie_number}'
            WHERE id = '${id}'`
        )
        res.send(200)
    },
    async deleteAppraisalCompany(req, res) {
        const id = req.params.id
        await pool.query(`DELETE FROM appraisal_companies WHERE id = '${id}'`)
        res.send(200)
    }
}

router.get("", appraisalCompanyController.getAllAppraisalCompanies)
router.post("", appraisalCompanyController.createAppraisalCompany)
router.get("/:id", appraisalCompanyController.getAppraisalCompanyById)
router.post("/:id", appraisalCompanyController.updateAppraisalComapany)
router.delete("/:id", appraisalCompanyController.deleteAppraisalCompany)

module.exports = router