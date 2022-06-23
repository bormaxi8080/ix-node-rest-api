'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import AccountController from "../../controllers/AccountController.js";
import AgentsController from "../../controllers/user-entities/AgentsController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Agents']
        // #swagger.description = 'Gets array of all agents'
        // #swagger.parameters['insurance_company_id'] = { description: 'Filter by ID of insurance company', type: 'integer', required: false }
        req.query ? await AgentsController.filter(req, res) : await AgentsController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Agents']
        // #swagger.description = 'Gets agent by ID'
        // #swagger.parameters['id'] = { description: 'ID of agent', type: 'integer', required: true}
        await AgentsController.findById(req, res);
    })
    .post("/", role(null), async (req, res) => {
        // #swagger.tags = ['Agents']
        // #swagger.description = 'Creates a new agent'
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Agent passport ID', type: 'string', required: true }
        // #swagger.parameters['first_name'] = { in: 'body', description: 'Agent name', type: 'string', required: true }
        // #swagger.parameters['second_name'] = { in: 'body', description: 'Agent last name', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Agent phone', type: 'string', required: true }
        // #swagger.parameters['email'] = { in: 'body', description: 'Agent email', type: 'string', required: true }
        // #swagger.parameters['address'] = { in: 'body', description: 'Agent address', type: 'string', required: true }
        // #swagger.parameters['employee_number'] = { in: 'body', description: 'Agent employee number', type: 'string', required: true }
        // #swagger.parameters['region_id'] = { in: 'body', description: 'Agent region ID', type: 'integer', required: true }
        // #swagger.parameters['insurance_company_ids'] = { in: 'body', description: 'Array of agent insurance company IDs in format {1,2,3,4}', type: 'string', required: false }
        req.body.role = "agent";
        await AccountController.registration(req, res);
    })
    .post("/login", role(null), async(req, res) => {
        // #swagger.tags = ['Agents']
        // #swagger.description = 'Login method'
        // #swagger.parameters['username'] = { in: 'body', description: 'User login', type: 'string', required: true }
        // #swagger.parameters['password'] = { in: 'body', description: 'User password', type: 'string', required: true }
        await AccountController.login(req, res);
    })
    .post("/logout", role(null), async(req, res) => {
        // #swagger.tags = ['Agents']
        // #swagger.description = 'Logout method'
        await AccountController.logout(req, res);
    })
    .get("/get-session", role(null), async(req, res) => {
        // #swagger.tags = ['Agents']
        // #swagger.description = 'Gets agent session by user session ID'
        // #swagger.parameters['sessionID'] = { in: 'headers', description: 'User session ID', type: 'string', required: true }
        await AccountController.getSession(req, res);
    })
    .patch("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Agents']
        // #swagger.description = 'Updates agent data'
        // #swagger.parameters['id'] = { description: 'ID of agent', type: 'integer', required: true}
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Agent passport ID', type: 'string', required: false }
        // #swagger.parameters['first_name'] = { in: 'body', description: 'Agent name', type: 'string', required: false }
        // #swagger.parameters['second_name'] = { in: 'body', description: 'Agent last name', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Agent phone', type: 'string', required: false }
        // #swagger.parameters['email'] = { in: 'body', description: 'Agent email', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Agent address', type: 'string', required: false }
        // #swagger.parameters['employee_number'] = { in: 'body', description: 'Agent employee number', type: 'string', required: false }
        // #swagger.parameters['region_id'] = { in: 'body', description: 'Agent region ID', type: 'integer', required: false }
        // #swagger.parameters['insurance_company_ids'] = { in: 'body', description: 'Array of agent insurance company IDs', type: 'string', required: false }
        await AgentsController.update(req, res);
    })
    .delete("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Agents']
        // #swagger.description = 'Deletes agent'
        // #swagger.parameters['id'] = { description: 'ID of agent', type: 'integer', required: true}
        await AgentsController.delete(req, res);
    })

export default router;