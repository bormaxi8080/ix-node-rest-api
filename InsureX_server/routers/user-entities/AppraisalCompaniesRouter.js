'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import AppraisalCompaniesController from "../../controllers/user-entities/AppraisalCompaniesController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Appraisal Companies']
        // #swagger.description = 'Gets array of all appraisal companies'
        // #swagger.parameters['region_id'] = { description: 'Filter by ID of region', type: 'integer', required: false }
        // #swagger.parameters['city_id'] = { description: 'Filter by ID of city', type: 'integer', required: false }
        // #swagger.parameters['insurance_company_id'] = { description: 'Filter by ID of insurance company', type: 'integer', required: false }
        req.query ? await AppraisalCompaniesController.filter(req, res) : await AppraisalCompaniesController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Appraisal Companies']
        // #swagger.description = 'Gets appraisal company by ID'
        // #swagger.parameters['id'] = { description: 'ID of appraisal company', type: 'integer', required: true}
        await AppraisalCompaniesController.findById(req, res);
    })

    // NOTE: no registration and login now
    // NOTE: no create, update and delete now

export default router;