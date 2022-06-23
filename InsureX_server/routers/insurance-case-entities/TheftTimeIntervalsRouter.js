'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import TheftTimeIntervalsController from "../../controllers/component-entities/TheftTimeIntervalsController.js";

const router = express.Router();

router

    // Theft details in insurance case
    .get("/:case_id/theft-time-interval", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case theft details'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await TheftTimeIntervalsController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/theft-time-interval/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals', 'Insurance Cases']
        // #swagger.description = 'Gets a theft detail with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of theft detail', type: 'integer', required: true}
        await TheftTimeIntervalsController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/theft-time-interval", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals', 'Insurance Cases']
        // #swagger.description = 'Creates a new theft detail and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['start_time_interval'] = { in: 'body', description: 'Start time interval', type: 'time', required: false }
        // #swagger.parameters['end_time_interval'] = { in: 'body', description: 'End time interval', type: 'time', required: false }
        await TheftTimeIntervalsController.create(req, res);
    })
    .patch("/:case_id/theft-time-interval/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals', 'Insurance Cases']
        // #swagger.description = 'Appends a theft detail to insurance case and update it (no creates theft detail!!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of theft detail', type: 'integer', required: true}
        // #swagger.parameters['start_time_interval'] = { in: 'body', description: 'Start time interval', type: 'time', required: false }
        // #swagger.parameters['end_time_interval'] = { in: 'body', description: 'End time interval', type: 'time', required: false }
        await TheftTimeIntervalsController.update(req, res);
    })
    .delete("/:case_id/theft-time-interval/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Theft Time Intervals', 'Insurance Cases']
        // #swagger.description = 'Remove theft detail from insurance case (no deletes witness!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of theft detail', type: 'integer', required: true}
        await TheftTimeIntervalsController.delete(req, res);
    })

export default router;