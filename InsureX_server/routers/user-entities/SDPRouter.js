'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import AccountController from "../../controllers/AccountController.js";
import SDPController from "../../controllers/user-entities/SDPController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['SDP']
        // #swagger.description = 'Gets array of all SDP'
        // #swagger.parameters['insurance_company_id'] = { description: 'Filter by ID of insurance company', type: 'integer', required: false }
        // #swagger.parameters['supplier_type_id'] = { description: 'Filter by ID of supplier type', type: 'integer', required: false }
        // #swagger.parameters['region_id'] = { description: 'Filter by ID of region', type: 'integer', required: false }
        // #swagger.parameters['city_id'] = { description: 'Filter by ID of city', type: 'integer', required: false }
        req.query ? await SDPController.filter(req, res) : await SDPController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['SDP']
        // #swagger.description = 'Gets SDP by ID'
        // #swagger.parameters['id'] = { description: 'ID of SDP', type: 'integer', required: true}
        await SDPController.findById(req, res);
    })
    .post("/", role(null), async (req, res) => {
        // #swagger.tags = ['SDP']
        // #swagger.description = 'Creates a new SDP'
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'SDP passport ID', type: 'string', required: true }
        // #swagger.parameters['first_name'] = { in: 'body', description: 'SDP name', type: 'string', required: true }
        // #swagger.parameters['second_name'] = { in: 'body', description: 'SDP last name', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'SDP phone', type: 'string', required: true }
        // #swagger.parameters['email'] = { in: 'body', description: 'SDP email', type: 'string', required: true }
        // #swagger.parameters['address'] = { in: 'body', description: 'SDP address', type: 'string', required: true }
        // #swagger.parameters['city_id'] = { in: 'body', description: 'SDP city ID', type: 'integer', required: true }
        // #swagger.parameters['insurance_company_ids'] = { in: 'body', description: 'Array of SDP insurance company IDs in format {1,2,3,4}', type: 'string', required: false }
        // #swagger.parameters['supplier_type_ids'] = { in: 'body', description: 'Array of SDP supplier type IDs', type: 'string', required: false }
        req.body.role = "sdp";
        await AccountController.registration(req, res);
    })
    .post("/login", role(null), async(req, res) => {
        // #swagger.tags = ['SDP']
        // #swagger.description = 'Login method'
        // #swagger.parameters['username'] = { in: 'body', description: 'User login', type: 'string', required: true }
        // #swagger.parameters['password'] = { in: 'body', description: 'User password', type: 'string', required: true }
        await AccountController.login(req, res);
    })
    .post("/logout", role(null), async(req, res) => {
        // #swagger.tags = ['SDP']
        // #swagger.description = 'Logout method'
        await AccountController.logout(req, res);
    })
    .get("/get-session", role(null), async(req, res) => {
        // #swagger.tags = ['SDP']
        // #swagger.description = 'Gets SDP session by user session ID'
        // #swagger.parameters['sessionID'] = { in: 'headers', description: 'User session ID', type: 'string', required: true }
        await AccountController.getSession(req, res);
    })
    .patch("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['SDP']
        // #swagger.description = 'Updates SDP'
        // #swagger.parameters['id'] = { description: 'ID of SDP', type: 'integer', required: true}
        // #swagger.parameters['passport_id'] = { in: 'body', description: 'SDP passport ID', type: 'string', required: false }
        // #swagger.parameters['first_name'] = { in: 'body', description: 'SDP name', type: 'string', required: false }
        // #swagger.parameters['second_name'] = { in: 'body', description: 'SDP last name', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'SDP phone', type: 'string', required: false }
        // #swagger.parameters['email'] = { in: 'body', description: 'SDP email', type: 'string', required: false }
        // #swagger.parameters['address'] = { in: 'body', description: 'SDP address', type: 'string', required: false }
        // #swagger.parameters['city_id'] = { in: 'body', description: 'SDP city ID', type: 'integer', required: false }
        // #swagger.parameters['insurance_company_ids'] = { in: 'body', description: 'Array of SDP insurance company ID', type: 'string', required: false }
        // #swagger.parameters['supplier_type_ids'] = { in: 'body', description: 'Array of SDP supplier type IDs', type: 'string', required: false }
        await SDPController.update(req, res);
    })
    .delete("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['SDP']
        // #swagger.description = 'Deletes SDP'
        // #swagger.parameters['id'] = { description: 'ID of SDP', type: 'integer', required: true}
        await SDPController.delete(req, res);
    })

export default router;