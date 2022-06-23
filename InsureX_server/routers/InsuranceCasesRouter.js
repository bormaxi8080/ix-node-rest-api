'use strict';

import express from "express";

import role from "../middleware/role.js";
import InsuranceCasesController from "../controllers/InsuranceCasesController.js";
import InsuredEventsController from "../controllers/insuredEventsController.js";

const router = express.Router();


router

    // Insurance Cases

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insurance Cases']
        // #swagger.description = 'Gets array of all insurance cases'
        // #swagger.parameters['insured_person_id'] = { description: 'Filter by ID of insured person', type: 'integer', required: false }
        // #swagger.parameters['agent_id'] = { description: 'Filter by ID of agent', type: 'integer', required: false }
        // #swagger.parameters['insured_event_id'] = { description: 'Filter by ID of insured event', type: 'integer', required: false }
        // #swagger.parameters['status_id'] = { description: 'Filter by ID of status', type: 'integer', required: false }
        // #swagger.parameters['city_id'] = { description: 'Filter by ID of city', type: 'integer', required: false }
        // #swagger.parameters['event_type_id'] = { description: 'Filter by ID of event type', type: 'integer', required: false }
        // #swagger.parameters['property_type_id'] = { description: 'Filter by ID of ', type: 'integer', required: false }
        req.query ? await InsuranceCasesController.filter(req, res) : await InsuranceCasesController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Cases']
        // #swagger.description = 'Gets insurance case by ID'
        // #swagger.parameters['id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await InsuranceCasesController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Cases']
        // #swagger.description = 'Creates a new insurance case'
        // #swagger.parameters['insured_person_id'] = { in: 'body', description: 'ID of insured person', type: 'integer', required: true }
        // #swagger.parameters['property_type_id'] = { in: 'body', description: 'ID of property type', type: 'integer', required: true }
        // #swagger.parameters['event_type_id'] = { in: 'body', description: 'ID of event type', type: 'integer', required: true }
        // #swagger.parameters['agent_id'] = { in: 'body', description: 'ID of agent', type: 'integer', required: false }
        // #swagger.parameters['city_id'] = { in: 'body', description: 'ID of city', type: 'integer', required: false }
        // #swagger.parameters['status_id'] = { in: 'body', description: 'ID of status', type: 'integer', required: false }
        // #swagger.parameters['incident_date'] = { in: 'body', description: 'Incident date', type: 'date', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Address', type: 'string', required: false }
        // #swagger.parameters['details'] = { in: 'body', description: 'Details', type: 'string', required: false }
        // #swagger.parameters['document_date'] = { in: 'body', description: 'Document date', type: 'string', required: true }
        // #swagger.parameters['policy'] = { in: 'body', description: 'Policy', type: 'string', required: false }
        // #swagger.parameters['claim_amount'] = { in: 'body', description: 'Claim amount', type: 'double', required: false }
        // #swagger.parameters['whose_signature'] = { in: 'body', description: 'Whose signature incident form', type: 'string', required: false }
        // #swagger.parameters['insurance_company_id'] = { description: 'ID of insurance company', type: 'integer', required: false }
        // #swagger.parameters['appraisal_company_id'] = { description: 'Appraisal company ID', type: 'integer', required: false }
        // #swagger.parameters['appraiser_id'] = { description: 'Appraiser ID', type: 'integer', required: false }
        await InsuranceCasesController.create(req, res);
    })
    .patch("/:id/upload-files", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Cases']
        // #swagger.description = 'Upload files into insurance case'
        // #swagger.parameters['id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['files'] = { in: 'files', description: 'Insured event files', type: 'string', required: true }
        await InsuranceCasesController.uploadFiles(req, res);
    })
    .patch("/:id/delete-files", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Cases']
        // #swagger.description = 'Delete files from insurance case'
        // #swagger.parameters['id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['deleted_files'] = { description: 'Array of file names in insured event files to delete', type: 'string', required: true }
        await InsuranceCasesController.deleteFiles(req, res);
    })
    .patch("/:id", role(null), async(req, res) =>{
        // #swagger.tags = ['Insurance Cases']
        // #swagger.description = 'Updates a insurance case'
        // #swagger.parameters['id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['property_type_id'] = { in: 'body', description: 'ID of property type', type: 'integer', required: false }
        // #swagger.parameters['event_type_id'] = { in: 'body', description: 'ID of event type', type: 'integer', required: false }
        // #swagger.parameters['agent_id'] = { in: 'body', description: 'ID of agent', type: 'integer', required: false }
        // #swagger.parameters['city_id'] = { in: 'body', description: 'ID of city', type: 'integer', required: false }
        // #swagger.parameters['status_id'] = { in: 'body', description: 'ID of status', type: 'integer', required: false }
        // #swagger.parameters['incident_date'] = { in: 'body', description: 'Incident date', type: 'date', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Address', type: 'string', required: false }
        // #swagger.parameters['details'] = { in: 'body', description: 'Details', type: 'string', required: false }
        // #swagger.parameters['document_date'] = { in: 'body', description: 'Document date', type: 'string', required: false }
        // #swagger.parameters['policy'] = { in: 'body', description: 'Policy', type: 'string', required: false }
        // #swagger.parameters['claim_amount'] = { in: 'body', description: 'Claim amount', type: 'double', required: false }
        // #swagger.parameters['whose_signature'] = { in: 'body', description: 'Whose signature incident form', type: 'string', required: false }
        // #swagger.parameters['insurance_company_id'] = { description: 'ID of insurance company', type: 'integer', required: false }
        // #swagger.parameters['appraisal_company_id'] = { description: 'Appraisal company ID', type: 'integer', required: false }
        // #swagger.parameters['appraiser_id'] = { description: 'Appraiser ID', type: 'integer', required: false }
        InsuredEventsController.model.extend = false;
        await InsuredEventsController._update(req, res);
        InsuredEventsController.model.extend = true;

        await InsuranceCasesController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Cases']
        // #swagger.description = 'Updates a insurance case'
        // #swagger.parameters['id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await InsuranceCasesController.delete(req, res);
    })
    .get("/:id/status", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Cases']
        // #swagger.description = 'Gets a insurance case status by id and emit status message to websocket broadcast'
        // #swagger.parameters['id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await InsuranceCasesController.status(req, res);
    })

export default router;