'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import DriversController from "../../controllers/component-entities/DriversController.js";

const router = express.Router();

router

    // Drivers
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers']
        // #swagger.description = 'Gets array of all drivers'
        await DriversController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers']
        // #swagger.description = 'Gets driver by ID'
        // #swagger.parameters['id'] = { description: 'ID of driver', type: 'integer', required: true}
        await DriversController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers']
        // #swagger.description = 'Creates a new driver'
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of driver', type: 'string', required: true }
        // #swagger.parameters['birthday'] = { in: 'body', description: 'Birthday of driver', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Prone of driver', type: 'string', required: true }
        // #swagger.parameters['license_number'] = { in: 'body', description: 'Driver license number', type: 'string', required: true }
        // #swagger.parameters['car_model'] = { in: 'body', description: 'Driver car model', type: 'string', required: false }
        // #swagger.parameters['has_permission'] = { in: 'body', description: 'Has driver permissions', type: 'boolean', required: false }
        // #swagger.parameters['driver_id'] = { in: 'body', description: 'Driver unique ID', type: 'string', required: false }
        await DriversController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers']
        // #swagger.description = 'Updates an existing driver'
        // #swagger.parameters['id'] = { description: 'ID of driver', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of driver', type: 'string', required: false }
        // #swagger.parameters['birthday'] = { in: 'body', description: 'Birthday of driver', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Prone of driver', type: 'string', required: false }
        // #swagger.parameters['license_number'] = { in: 'body', description: 'Driver license number', type: 'string', required: false }
        // #swagger.parameters['car_model'] = { in: 'body', description: 'Driver car model', type: 'string', required: false }
        // #swagger.parameters['has_permission'] = { in: 'body', description: 'Has driver permissions', type: 'boolean', required: false }
        // #swagger.parameters['driver_id'] = { in: 'body', description: 'Driver unique ID', type: 'string', required: false }
        await DriversController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers']
        // #swagger.description = 'Deletes a driver'
        // #swagger.parameters['id'] = { description: 'ID of driver', type: 'integer', required: true}
        await DriversController.delete(req, res);
    })

export default router;