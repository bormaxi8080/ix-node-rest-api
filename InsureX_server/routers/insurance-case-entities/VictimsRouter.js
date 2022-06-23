'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import VictimsController from "../../controllers/component-entities/VictimsController.js";

const router = express.Router();

router

    // Victims in insurance case
    .get("/:case_id/victim", role(null), async(req, res) => {
        // #swagger.tags = ['Victims', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case victims'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await VictimsController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/victim/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Victims', 'Insurance Cases']
        // #swagger.description = 'Gets a victim with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of victim', type: 'integer', required: true}
        await VictimsController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/victim", role(null), async(req, res) => {
        // #swagger.tags = ['Victims', 'Insurance Cases']
        // #swagger.description = 'Creates a new victim and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'First name of victim', type: 'string', required: true }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last name of victim', type: 'string', required: true }
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Victim passport ID', type: 'string', required: true }
        // #swagger.parameters['address'] = { in: 'body', description: 'Victim address', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Victim phone', type: 'string', required: false }
        // #swagger.parameters['city_ids'] = { in: 'body', description: 'Array of city ids for victim', type: 'array', required: false }
        await VictimsController.create(req, res);
    })
    .patch("/:case_id/victim/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Victims', 'Insurance Cases']
        // #swagger.description = 'Appends a victim to insurance case and update it (no creates victim!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of victim', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'First name of victim', type: 'string', required: false }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last name of victim', type: 'string', required: false }
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Victim passport ID', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Victim address', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Victim phone', type: 'string', required: false }
        // #swagger.parameters['city_ids'] = { in: 'body', description: 'Array of city ids for victim', type: 'array', required: false }
        await VictimsController.update(req, res);
    })
    .delete("/:case_id/victim/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Victims', 'Insurance Cases']
        // #swagger.description = 'Remove victim from insurance case (no deletes victim!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of victim', type: 'integer', required: true}
        await VictimsController.delete(req, res);
    })

export default router;