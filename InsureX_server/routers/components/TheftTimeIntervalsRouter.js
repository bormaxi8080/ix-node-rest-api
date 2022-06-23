'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import TheftTimeIntervalsController from "../../controllers/component-entities/TheftTimeIntervalsController.js";

const router = express.Router();

router

    // Theft Details
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals']
        // #swagger.description = 'Gets all theft details objects'
        await TheftTimeIntervalsController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals']
        // #swagger.description = 'Gets theft detail by ID'
        // #swagger.parameters['id'] = { description: 'ID of theft detail', type: 'integer', required: true}
        await TheftTimeIntervalsController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals']
        // #swagger.description = 'Creates a new theft detail'
        // #swagger.parameters['start_time_interval'] = { in: 'body', description: 'Start time interval', type: 'time', required: false }
        // #swagger.parameters['end_time_interval'] = { in: 'body', description: 'End time interval', type: 'time', required: false }
        await TheftTimeIntervalsController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals']
        // #swagger.description = 'Updates an existing theft detail'
        // #swagger.parameters['id'] = { description: 'ID of theft detail', type: 'integer', required: true}
        // #swagger.parameters['start_time_interval'] = { in: 'body', description: 'Start time interval', type: 'time', required: false }
        // #swagger.parameters['end_time_interval'] = { in: 'body', description: 'End time interval', type: 'time', required: false }
        await TheftTimeIntervalsController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals']
        // #swagger.description = 'Deletes a theft detail'
        // #swagger.parameters['id'] = { description: 'ID of theft detail', type: 'integer', required: true}
        await TheftTimeIntervalsController.delete(req, res);
    })

export default router;