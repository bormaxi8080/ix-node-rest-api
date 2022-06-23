'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import VictimsController from "../../controllers/component-entities/VictimsController.js";

const router = express.Router();

router

    // Victims
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Victims']
        // #swagger.description = 'Gets array of all victims'
        await VictimsController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Victims']
        // #swagger.description = 'Gets victim by ID'
        // #swagger.parameters['id'] = { description: 'ID of victim', type: 'integer', required: true}
        await VictimsController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Victims']
        // #swagger.description = 'Creates a new victim'
        // #swagger.parameters['first_name'] = { in: 'body', description: 'First name of victim', type: 'string', required: true }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last name of victim', type: 'string', required: true }
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Victim passport ID', type: 'string', required: true }
        // #swagger.parameters['address'] = { in: 'body', description: 'Victim address', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Victim phone', type: 'string', required: false }
        // #swagger.parameters['city_ids'] = { in: 'body', description: 'Array of city ids for victim', type: 'array', required: false }
        await VictimsController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Victims']
        // #swagger.description = 'Updates an existing victim'
        // #swagger.parameters['id'] = { description: 'ID of victim', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'First name of victim', type: 'string', required: false }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last name of victim', type: 'string', required: false }
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Victim passport ID', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Victim address', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Victim phone', type: 'string', required: false }
        // #swagger.parameters['city_ids'] = { in: 'body', description: 'Array of city ids for victim', type: 'array', required: false }
        await VictimsController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Victims']
        // #swagger.description = 'Deletes a victim'
        // #swagger.parameters['id'] = { description: 'ID of victim', type: 'integer', required: true}
        await VictimsController.delete(req, res);
    })

export default router;