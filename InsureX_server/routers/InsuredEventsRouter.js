'use strict';

import express from "express";

import role from "./../middleware/role.js";

import InsuredEventsController from "../controllers/insuredEventsController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Events']
        // #swagger.description = 'Gets array of insured events'
        // #swagger.parameters['insurance_company_id'] = { description: 'Filter by ID of insurance company', type: 'integer', required: false }
        // #swagger.parameters['insured_person_id'] = { description: 'Filter by ID of insured person', type: 'integer', required: false }
        // #swagger.parameters['agent_id'] = { description: 'Filter by ID of agent', type: 'integer', required: false }
        // #swagger.parameters['appraisal_company_id'] = { description: 'Filter by ID of appraisal company', type: 'integer', required: false }
        // #swagger.parameters['appraiser_id'] = { description: 'Filter by ID of appraiser', type: 'integer', required: false }
        // #swagger.parameters['region_id'] = { description: 'Filter by ID of region', type: 'integer', required: false }
        // #swagger.parameters['insured_event_number'] = { description: 'Filter by insured event number', type: 'string', required: false }
        // #swagger.parameters['case_id'] = { description: 'Filter by insurance case ID', type: 'integer', required: false }
        req.query ? await InsuredEventsController.filter(req, res) : await InsuredEventsController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Events']
        // #swagger.description = 'Gets insured event by ID'
        // #swagger.parameters['id'] = { description: 'ID of insured event', type: 'integer', required: true}
        await InsuredEventsController.findById(req, res);
    })
    .post("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Events']
        // #swagger.description = 'Creates a new insured event'
        // #swagger.parameters['insured_person_id'] = { description: 'Insured person ID', type: 'integer', required: true }
        // #swagger.parameters['insurance_company_id'] = { description: 'Insurance company ID', type: 'integer', required: true }
        // #swagger.parameters['agent_id'] = { description: 'Agent ID', type: 'integer', required: true }
        // #swagger.parameters['region_id'] = { description: 'Region ID', type: 'integer', required: true }
        // #swagger.parameters['appraisal_company_id'] = { description: 'Appraisal company ID', type: 'integer', required: false }
        // #swagger.parameters['appraiser_id'] = { description: 'Appraiser ID', type: 'integer', required: false }
        // #swagger.parameters['address'] = { description: 'Address of insured event', type: 'string', required: true }
        // #swagger.parameters['date'] = { description: 'Date of insured event', type: 'datetime', required: true }
        // #swagger.parameters['files'] = { in: 'files', description: 'Insured event files', type: 'string', required: false }
        await InsuredEventsController.create(req, res);
    })
    .patch("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Events']
        // #swagger.description = 'Updates insured event data'
        // #swagger.parameters['id'] = { description: 'ID of insured event', type: 'integer', required: true}
        // #swagger.parameters['insured_person_id'] = { description: 'Insured person ID', type: 'integer', required: false }
        // #swagger.parameters['insurance_company_id'] = { description: 'Insurance company ID', type: 'integer', required: false }
        // #swagger.parameters['agent_id'] = { description: 'Agent ID', type: 'integer', required: false }
        // #swagger.parameters['region_id'] = { description: 'Region ID', type: 'integer', required: false }
        // #swagger.parameters['appraisal_company_id'] = { description: 'Appraisal company ID', type: 'integer', required: false }
        // #swagger.parameters['appraiser_id'] = { description: 'Appraiser ID', type: 'integer', required: false }
        // #swagger.parameters['address'] = { description: 'Address of insured event', type: 'string', required: false }
        // #swagger.parameters['date'] = { description: 'Date of insured event', type: 'datetime', required: false }
        // #swagger.parameters['files'] = { in: 'files', description: 'Insured event files', type: 'string', required: false }
        // #swagger.parameters['deleted_files'] = { description: 'Array of file names in insured event files to delete', type: 'string', required: false }
        await InsuredEventsController.update(req, res);
    })
    .delete("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Events']
        // #swagger.description = 'Deletes insured event'
        // #swagger.parameters['id'] = { description: 'ID of insured event', type: 'integer', required: true}
        await InsuredEventsController.delete(req, res);
    })

export default router;