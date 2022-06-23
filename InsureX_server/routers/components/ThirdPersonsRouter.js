'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import ThirdPersonsController from "../../controllers/component-entities/ThirdPersonsController.js";


const router = express.Router();

router

    // Third persons
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons']
        // #swagger.description = 'Gets array of all 3d persons'
        await ThirdPersonsController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons']
        // #swagger.description = 'Gets 3d person by ID'
        // #swagger.parameters['id'] = { description: 'ID of 3d person', type: 'integer', required: true}
        await ThirdPersonsController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons']
        // #swagger.description = 'Creates a new 3d person'
        // #swagger.parameters['first_name'] = { in: 'body', description: 'First name', type: 'string', required: true }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last name', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Address', type: 'string', required: false }
        // #swagger.parameters['damage_info'] = { in: 'body', description: '', type: 'string', required: false }
        await ThirdPersonsController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons']
        // #swagger.description = 'Updates an existing 3d person'
        // #swagger.parameters['id'] = { description: 'ID of 3d person', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'First name', type: 'string', required: false }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last name', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Address', type: 'string', required: false }
        // #swagger.parameters['damage_info'] = { in: 'body', description: 'Damage info', type: 'string', required: false }
        await ThirdPersonsController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons']
        // #swagger.description = 'Deletes a 3d person'
        // #swagger.parameters['id'] = { description: 'ID of 3d person', type: 'integer', required: true}
        await ThirdPersonsController.delete(req, res);
    })

export default router;