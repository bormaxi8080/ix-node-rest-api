'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import OthersController from "../../controllers/component-entities/OthersController.js";

const router = express.Router();

router

    // Others
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Others']
        // #swagger.description = 'Gets array of all other persons'
        await OthersController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Others']
        // #swagger.description = 'Gets witness by ID'
        // #swagger.parameters['id'] = { description: 'ID of other persons', type: 'integer', required: true}
        await OthersController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Others']
        // #swagger.description = 'Creates a new other person'
        // #swagger.parameters['id'] = { description: 'ID of other person', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of other person', type: 'string', required: true }
        // #swagger.parameters['license_number'] = { in: 'body', description: 'License number', type: 'string', required: false }
        // #swagger.parameters['passport_number'] = { in: 'body', description: 'Passport number of other person', type: 'string', required: false }
        // #swagger.parameters['car_model'] = { in: 'body', description: 'Car model of other person', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone of other person', type: 'string', required: false }
        // #swagger.parameters['is_sue'] = { in: 'body', description: 'Is other person sue', type: 'boolean', required: false }
        await OthersController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Others']
        // #swagger.description = 'Updates an existing other person'
        // #swagger.parameters['id'] = { description: 'ID of other person', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of other person', type: 'string', required: false }
        // #swagger.parameters['license_number'] = { in: 'body', description: 'License number', type: 'string', required: false }
        // #swagger.parameters['passport_number'] = { in: 'body', description: 'Passport number of other person', type: 'string', required: false }
        // #swagger.parameters['car_model'] = { in: 'body', description: 'Car model of other person', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone of other person', type: 'string', required: false }
        // #swagger.parameters['is_sue'] = { in: 'body', description: 'Is other person sue', type: 'boolean', required: false }
        await OthersController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Others']
        // #swagger.description = 'Deletes a other person'
        // #swagger.parameters['id'] = { description: 'ID of other person', type: 'integer', required: true}
        await OthersController.delete(req, res);
    })

export default router;