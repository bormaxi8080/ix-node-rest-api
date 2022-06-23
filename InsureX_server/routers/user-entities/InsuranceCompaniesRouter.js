'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import AccountController from "../../controllers/AccountController.js";
import InsuranceCompaniesController from "../../controllers/user-entities/InsuranceCompaniesController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insurance Companies']
        // #swagger.description = 'Gets array of all insurance companies'
        await InsuranceCompaniesController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insurance Companies']
        // #swagger.description = 'Gets insurance company by ID'
        // #swagger.parameters['id'] = { description: 'ID of insurance company', type: 'integer', required: true}
        await InsuranceCompaniesController.findById(req, res);
    })
    .post("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insurance Companies']
        // #swagger.description = 'Creates a new insurance company'
        // #swagger.parameters['title'] = { in: 'body', description: 'Insurance company title', type: 'string', required: true }
        // #swagger.parameters['address'] = { in: 'body', description: 'Address', type: 'string', required: true }
        // #swagger.parameters['email'] = { in: 'body', description: 'Email', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone', type: 'string', required: true }
        // #swagger.parameters['ie_number'] = { in: 'body', description: 'IE Number', type: 'string', required: true }
        req.body.role = "insurance_company";
        await AccountController.registration(req, res);
    })
    .post("/login", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Companies']
        // #swagger.description = 'Login method'
        // #swagger.parameters['username'] = { in: 'body', description: 'User login', type: 'string', required: true }
        // #swagger.parameters['password'] = { in: 'body', description: 'User password', type: 'string', required: true }
        await AccountController.login(req, res);
    })
    .post("/logout", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Companies']
        // #swagger.description = 'Logout method'
        await AccountController.logout(req, res);
    })
    .get("/get-session", role(null), async(req, res) => {
        // #swagger.tags = ['Insurance Companies']
        // #swagger.description = 'Gets insurance company session by user session ID'
        // #swagger.parameters['sessionID'] = { in: 'headers', description: 'User session ID', type: 'string', required: true }
        await AccountController.getSession(req, res);
    })
    .patch("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insurance Companies']
        // #swagger.description = 'Updates insurance company data'
        // #swagger.parameters['id'] = { description: 'ID of insurance company', type: 'integer', required: true}
        // #swagger.parameters['title'] = { in: 'body', description: 'Insurance company title', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'Address', type: 'string', required: false }
        // #swagger.parameters['email'] = { in: 'body', description: 'Email', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone', type: 'string', required: false }
        // #swagger.parameters['ie_number'] = { in: 'body', description: 'IE Number', type: 'string', required: false }
        await InsuranceCompaniesController.update(req, res);
    })
    .delete("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insurance Companies']
        // #swagger.description = 'Deletes insurance company'
        // #swagger.parameters['id'] = { description: 'ID of insurance company', type: 'integer', required: true}
        await InsuranceCompaniesController.delete(req, res);
    })

export default router;