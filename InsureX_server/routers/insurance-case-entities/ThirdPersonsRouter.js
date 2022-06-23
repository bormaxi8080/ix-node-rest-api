'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import ThirdPersonsController from "../../controllers/component-entities/ThirdPersonsController.js";


const router = express.Router();

router

    // Third persons in insurance case
    .get("/:case_id/3d-person", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case 3d persons'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await ThirdPersonsController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/3d-person/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons', 'Insurance Cases']
        // #swagger.description = 'Gets a 3d person with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of 3d person', type: 'integer', required: true}
        await ThirdPersonsController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/3d-person", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons', 'Insurance Cases']
        // #swagger.description = 'Creates a new 3d person and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'First name', type: 'string', required: true }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last name', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Address', type: 'string', required: false }
        // #swagger.parameters['damage_info'] = { in: 'body', description: 'Damage info', type: 'string', required: false }
        await ThirdPersonsController.create(req, res);
    })
    .patch("/:case_id/3d-person/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons', 'Insurance Cases']
        // #swagger.description = 'Appends 3d person to insurance case and update it (no creates 3d person!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of 3d person', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'First name', type: 'string', required: false }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last name', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Address', type: 'string', required: false }
        // #swagger.parameters['damage_info'] = { in: 'body', description: 'Damage info', type: 'string', required: false }
        await ThirdPersonsController.update(req, res);
    })
    .delete("/:case_id/3d-person/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Third Persons', 'Insurance Cases']
        // #swagger.description = 'Remove 3d person from insurance case (no deletes 3d person!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of 3d person', type: 'integer', required: true}
        await ThirdPersonsController.delete(req, res);
    })

export default router;