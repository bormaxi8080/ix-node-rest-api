'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import AccountController from "../../controllers/AccountController.js";
import AppraisersController from "../../controllers/user-entities/AppraisersController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Appraisers']
        // #swagger.description = 'Gets array of all appraisers'
        // #swagger.parameters['insurance_company_id'] = { description: 'Filter by ID of insurance company', type: 'integer', required: false }
        // #swagger.parameters['appraisal_company_id'] = { description: 'Filter by ID of appraisal company', type: 'integer', required: false }
        // #swagger.parameters['region_id'] = { description: 'Filter by ID of region', type: 'integer', required: false }
        req.query ? await AppraisersController.filter(req, res) : await AppraisersController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Appraisers']
        // #swagger.description = 'Gets appraiser by ID'
        // #swagger.parameters['id'] = { description: 'ID of appraiser', type: 'integer', required: true}
        await AppraisersController.findById(req, res);
    })
    .post("/", role(null), async (req, res) => {
        // #swagger.tags = ['Appraisers']
        // #swagger.description = 'Creates a new appraiser'
        // #swagger.parameters['insurance_company_id'] = { description: 'ID of insurance company', type: 'integer', required: false}
        // #swagger.parameters['appraisal_company_id'] = { description: 'ID of appraisal company', type: 'integer', required: true}
        // #swagger.parameters['region_id'] = { description: 'ID of region', type: 'integer', required: true}
        // #swagger.parameters['passport_id'] = { description: 'Passport ID', type: 'string', required: true}
        // #swagger.parameters['first_name'] = { description: 'First name', type: 'string', required: true}
        // #swagger.parameters['second_name'] = { description: 'Last name', type: 'string', required: true}
        // #swagger.parameters['phone'] = { description: 'Phone', type: 'string', required: true}
        // #swagger.parameters['email'] = { description: 'Email', type: 'string', required: true}
        req.body.role = "appraiser";
        await AccountController.registration(req, res);
    })
    .post("/login", role(null), async(req, res) => {
        // #swagger.tags = ['Appraisers']
        // #swagger.description = 'Login method'
        // #swagger.parameters['username'] = { in: 'body', description: 'User login', type: 'string', required: true }
        // #swagger.parameters['password'] = { in: 'body', description: 'User password', type: 'string', required: true }
        await AccountController.login(req, res);
    })
    .post("/logout", role(null), async(req, res) => {
        // #swagger.tags = ['Appraisers']
        // #swagger.description = 'Logout method'
        await AccountController.logout(req, res);
    })
    .get("/get-session", role(null), async(req, res) => {
        // #swagger.tags = ['Appraisers']
        // #swagger.description = 'Gets appraiser session by user session ID'
        // #swagger.parameters['sessionID'] = { in: 'headers', description: 'User session ID', type: 'string', required: true }
        await AccountController.getSession(req, res);
    })
    .patch("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Appraisers']
        // #swagger.description = 'Updates appraiser data'
        // #swagger.parameters['id'] = { description: 'ID of appraiser', type: 'integer', required: true}
        // #swagger.parameters['insurance_company_id'] = { description: 'ID of insurance company', type: 'integer', required: false}
        // #swagger.parameters['appraisal_company_id'] = { description: 'ID of appraisal company', type: 'integer', required: false}
        // #swagger.parameters['region_id'] = { description: 'ID of region', type: 'integer', required: false}
        // #swagger.parameters['passport_id'] = { description: 'Passport ID', type: 'string', required: false}
        // #swagger.parameters['first_name'] = { description: 'First name', type: 'string', required: false}
        // #swagger.parameters['second_name'] = { description: 'Last name', type: 'string', required: false}
        // #swagger.parameters['phone'] = { description: 'Phone', type: 'string', required: false}
        // #swagger.parameters['email'] = { description: 'Email', type: 'string', required: false}
        await AppraisersController.update(req, res);
    })
    .delete("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Appraisers']
        // #swagger.description = 'Deletes appraiser'
        // #swagger.parameters['id'] = { description: 'ID of appraiser', type: 'integer', required: true}
        await AppraisersController.delete(req, res);
    })

export default router;