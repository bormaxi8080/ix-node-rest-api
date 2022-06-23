'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import LastUsersController from "../../controllers/component-entities/LastUsersController.js";

const router = express.Router();

router

    // Last users in insurance case
    .get("/:case_id/last-user", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case last users'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await LastUsersController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/last-user/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users', 'Insurance Cases']
        // #swagger.description = 'Gets a last user-entities with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of last user-entities', type: 'integer', required: true}
        await LastUsersController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/last-user", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users', 'Insurance Cases']
        // #swagger.description = 'Creates a new last user-entities and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'Last user-entities first name', type: 'string', required: true }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last user-entities last name', type: 'string', required: true }
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Last user-entities passport ID', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Last user-entities phone', type: 'string', required: false }
        // #swagger.parameters['relationship'] = { in: 'body', description: 'Last user-entities relationship', type: 'string', required: false }
        await LastUsersController.create(req, res);
    })
    .patch("/:case_id/last-user/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users', 'Insurance Cases']
        // #swagger.description = 'Appends last user-entities to insurance case and update it (no creates last user-entities!!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of last user-entities', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'Last user-entities first name', type: 'string', required: false }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last user-entities last name', type: 'string', required: false }
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Last user-entities passport ID', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Last user-entities phone', type: 'string', required: false }
        // #swagger.parameters['relationship'] = { in: 'body', description: 'Last user-entities relationship', type: 'string', required: false }
        await LastUsersController.update(req, res);
    })
    .delete("/:case_id/last-user/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users', 'Insurance Cases']
        // #swagger.description = 'Remove last user-entities from insurance case (no deletes last user-entities!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of last user-entities', type: 'integer', required: true}
        await LastUsersController.delete(req, res);
    })

export default router;