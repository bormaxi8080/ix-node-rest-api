'use strict';

import express from "express";

import role from "./../middleware/role.js";

import meetingsController from "../controllers/MeetingsController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Meetings']
        // #swagger.description = 'Gets array of meetings'
        // #swagger.parameters['start_date'] = { description: 'Filter by start date', type: 'date', required: true }
        // #swagger.parameters['end_date'] = { description: 'Filter by end date', type: 'date', required: true }
        // #swagger.parameters['sdp_id'] = { description: 'Filter by ID of SDP', type: 'integer', required: false }
        // #swagger.parameters['appraiser_id'] = { description: 'Filter by ID of Appraiser', type: 'integer', required: false }
        // #swagger.parameters['insurance_case_id'] = { description: 'Filter by ID of Insurance Case', type: 'integer', required: false }
        // #swagger.parameters['accepted'] = { description: 'Filter by accepted flag', type: 'boolean', required: false }
        // #swagger.parameters['approved'] = { description: 'Filter by approved flag', type: 'integer', required: false }
        req.query ? await meetingsController.filter(req, res) : await meetingsController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Meetings']
        // #swagger.description = 'Gets meeting by ID'
        // #swagger.parameters['id'] = { description: 'ID of meeting', type: 'integer', required: true}
        await meetingsController.findById(req, res);
    })
    .post("/", role(null), async (req, res) => {
        // #swagger.tags = ['Meetings']
        // #swagger.description = 'Creates a new meeting'
        // #swagger.parameters['date'] = { description: 'Meeting date and time', type: 'datetime', required: true }
        // #swagger.parameters['sdp_id'] = { description: 'SDP ID', type: 'integer', required: true }
        // #swagger.parameters['appraiser_id'] = { description: 'Appraiser ID', type: 'integer', required: true }
        // #swagger.parameters['insurance_case_id'] = { description: 'Insurance Case ID', type: 'integer', required: true }
        // #swagger.parameters['approved'] = { description: 'SDP ID', type: 'boolean', required: false }
        // #swagger.parameters['accepted'] = { description: 'SDP ID', type: 'boolean', required: false }
        await meetingsController.create(req, res);
    })
    .patch("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Meetings']
        // #swagger.description = 'Updates meeting data'
        // #swagger.parameters['id'] = { description: 'ID of meeting', type: 'integer', required: true }
        // #swagger.parameters['date'] = { description: 'Meeting date and time', type: 'datetime', required: false }
        // #swagger.parameters['sdp_id'] = { description: 'SDP ID', type: 'integer', required: false }
        // #swagger.parameters['appraiser_id'] = { description: 'Appraiser ID', type: 'integer', required: false }
        // #swagger.parameters['insurance_case_id'] = { description: 'Insurance Case ID', type: 'integer', required: false }
        // #swagger.parameters['approved'] = { description: 'SDP ID', type: 'boolean', required: false }
        // #swagger.parameters['accepted'] = { description: 'SDP ID', type: 'boolean', required: false }
        await meetingsController.update(req, res);
    })
    .delete("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Meetings']
        // #swagger.description = 'Deletes meeting'
        // #swagger.parameters['id'] = { description: 'ID of meeting', type: 'integer', required: true}
        await meetingsController.delete(req, res);
    })

export default router;