'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import DriversController from "../../controllers/component-entities/DriversController.js";

const router = express.Router();

router

    // Drivers in insurance case
    .get("/:case_id/driver", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case drivers'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await DriversController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/driver/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers', 'Insurance Cases']
        // #swagger.description = 'Gets a driver with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of driver', type: 'integer', required: true}
        await DriversController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/driver", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers', 'Insurance Cases']
        // #swagger.description = 'Creates a new driver and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of driver', type: 'string', required: true }
        // #swagger.parameters['birthday'] = { in: 'body', description: 'Birthday of driver', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Prone of driver', type: 'string', required: true }
        // #swagger.parameters['license_number'] = { in: 'body', description: 'Driver license number', type: 'string', required: true }
        // #swagger.parameters['car_model'] = { in: 'body', description: 'Driver car model', type: 'string', required: false }
        // #swagger.parameters['has_permission'] = { in: 'body', description: 'Has driver permissions', type: 'boolean', required: false }
        // #swagger.parameters['driver_id'] = { in: 'body', description: 'Driver unique ID', type: 'string', required: false }
        await DriversController.create(req, res);
    })
    .patch("/:case_id/driver/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers', 'Insurance Cases']
        // #swagger.description = 'Appends a driver to insurance case and update it (no creates driver!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
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
    .delete("/:case_id/driver/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Drivers', 'Insurance Cases']
        // #swagger.description = 'Remove driver from insurance case (no deletes driver!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of driver', type: 'integer', required: true}
        await DriversController.delete(req, res);
    })

export default router;