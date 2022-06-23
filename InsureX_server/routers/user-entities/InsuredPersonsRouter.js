'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import AccountController from "../../controllers/AccountController.js";
import InsuredPersonsController from "../../controllers/user-entities/InsuredPersonsController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Persons']
        // #swagger.description = 'Gets array of all insured persons'
        // #swagger.parameters['insurance_company_id'] = { description: 'Filter by ID of insurance company', type: 'integer', required: false }
        //await InsuredPersonsController.query(req, res);
        req.query ? await InsuredPersonsController.filter(req, res) : await InsuredPersonsController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Persons']
        // #swagger.description = 'Gets insured person by ID'
        // #swagger.parameters['id'] = { description: 'ID of insured person', type: 'integer', required: true}
        await InsuredPersonsController.findById(req, res);
    })
    .post("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Persons']
        // #swagger.description = 'Creates a new user account with insured_person role
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Insured person passport ID', type: 'string', required: true }
        // #swagger.parameters['first_name'] = { in: 'body', description: 'Insured person name', type: 'string', required: true }
        // #swagger.parameters['second_name'] = { in: 'body', description: 'Insured person last name', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Insured person phone', type: 'string', required: true }
        // #swagger.parameters['email'] = { in: 'body', description: 'Insured person email', type: 'string', required: true }
        // #swagger.parameters['address'] = { in: 'body', description: 'Insured person address', type: 'string', required: true }
        // #swagger.parameters['city_id'] = { in: 'body', description: 'Insured person city ID', type: 'integer', required: true }
        // #swagger.parameters['insurance_company_id'] = { in: 'body', description: 'Insured person company ID', type: 'integer', required: true }
        // #swagger.parameters['agent_id'] = { in: 'body', description: 'Insured person agent ID', type: 'integer', required: true }
        // #swagger.parameters['sign_picture'] = { in: 'body', description: 'Insured person sign picture', type: 'integer', required: false }
        req.body.role = "insured_person";
        await AccountController.registration(req, res);
    })
    .post("/login", role(null), async(req, res) => {
        // #swagger.tags = ['Insured Persons']
        // #swagger.description = 'Login method'
        // #swagger.parameters['username'] = { in: 'body', description: 'User login', type: 'string', required: true }
        // #swagger.parameters['password'] = { in: 'body', description: 'User password', type: 'string', required: true }
        await AccountController.login(req, res);
    })
    .post("/logout", role(null), async(req, res) => {
        // #swagger.tags = ['Insured Persons']
        // #swagger.description = 'Logout method'
        await AccountController.logout(req, res);
    })
    .get("/get-session", role(null), async(req, res) => {
        // #swagger.tags = ['Insured Persons']
        // #swagger.description = 'Gets insured person session by user session ID'
        // #swagger.parameters['sessionID'] = { in: 'headers', description: 'User session ID', type: 'string', required: true }
        await AccountController.getSession(req, res);
    })
    .patch("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Persons']
        // #swagger.description = 'Updates insured person data'
        // #swagger.parameters['id'] = { description: 'ID of insured person', type: 'integer', required: true}
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'Insured person passport ID', type: 'string', required: false }
        // #swagger.parameters['first_name'] = { in: 'body', description: 'Insured person name', type: 'string', required: false }
        // #swagger.parameters['second_name'] = { in: 'body', description: 'Insured person last name', type: 'string', required: false}
        // #swagger.parameters['phone'] = { in: 'body', description: 'Insured person phone', type: 'string', required: false }
        // #swagger.parameters['email'] = { in: 'body', description: 'Insured person email', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Insured person address', type: 'string', required: false }
        // #swagger.parameters['city_id'] = { in: 'body', description: 'Insured person city ID', type: 'integer', required: false }
        // #swagger.parameters['insurance_company_id'] = { in: 'body', description: 'Insured person company ID', type: 'integer', required: false }
        // #swagger.parameters['agent_id'] = { in: 'body', description: 'Insured person agent ID', type: 'integer', required: false }
        // #swagger.parameters['sign_picture'] = { in: 'body', description: 'Insured person sign picture', type: 'integer', required: false }
        await InsuredPersonsController.update(req, res);
    })
    .delete("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Persons']
        // #swagger.description = 'Deletes insured person'
        // #swagger.parameters['id'] = { description: 'ID of insured person', type: 'integer', required: true}
        await InsuredPersonsController.delete(req, res);
    })

export default router;