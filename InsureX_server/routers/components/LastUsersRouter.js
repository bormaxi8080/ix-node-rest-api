'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import LastUsersController from "../../controllers/component-entities/LastUsersController.js";

const router = express.Router();

router

    // Last Users
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users']
        // #swagger.description = 'Gets array of all last users'
        await LastUsersController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users']
        // #swagger.description = 'Gets last user-entities by ID'
        // #swagger.parameters['id'] = { description: 'ID of last user-entities', type: 'integer', required: true}
        await LastUsersController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users']
        // #swagger.description = 'Creates a new last user-entities'
        // #swagger.parameters['first_name'] = { in: 'body', description: 'Last user-entities first name', type: 'string', required: true }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last user-entities last name', type: 'string', required: true }
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Last user-entities passport ID', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Last user-entities phone', type: 'string', required: false }
        // #swagger.parameters['relationship'] = { in: 'body', description: 'Last user-entities relationship', type: 'string', required: false }
        await LastUsersController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users']
        // #swagger.description = 'Updates an existing last user-entities'
        // #swagger.parameters['id'] = { description: 'ID of last user-entities', type: 'integer', required: true}
        // #swagger.parameters['first_name'] = { in: 'body', description: 'Last user-entities first name', type: 'string', required: false }
        // #swagger.parameters['last_name'] = { in: 'body', description: 'Last user-entities last name', type: 'string', required: false }
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Last user-entities passport ID', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Last user-entities phone', type: 'string', required: false }
        // #swagger.parameters['relationship'] = { in: 'body', description: 'Last user-entities relationship', type: 'string', required: false }
        await LastUsersController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Last Users']
        // #swagger.description = 'Deletes a last user-entities'
        // #swagger.parameters['id'] = { description: 'ID of last user-entities', type: 'integer', required: true}
        await LastUsersController.delete(req, res);
    })

export default router;