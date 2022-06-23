'use strict';

import express from "express";

import role from "../middleware/role.js";
import AccountController from "../controllers/AccountController.js";

const router = express.Router();

router

    .post("/", role(null), async (req, res) => {
        // #swagger.tags = ['Account']
        // #swagger.description = 'Creates a new user account with same role (insured person, insurance_company, appraisal_company, agent, sdp. Deprecated method, please use specific registration and login methods!)'
        // #swagger.parameters['username'] = { in: 'body', description: 'User login, not required for insured persons', type: 'string', required: true }
        // #swagger.parameters['password'] = { in: 'body', description: 'User password, not required for insured persons', type: 'string', required: true }
        // #swagger.parameters['role'] = { in: 'body', description: 'User role, required if registration role is defined', type: 'string', required: true }
        await AccountController.registration(req, res);
    })
    .post("/login", role(null), async (req, res) => {
        // #swagger.tags = ['Account']
        // #swagger.description = 'Login method'
        // #swagger.parameters['username'] = { in: 'body', description: 'User login', type: 'string', required: true }
        // #swagger.parameters['password'] = { in: 'body', description: 'User password', type: 'string', required: true }
        await AccountController.login(req, res);
    })
    .post("/logout", role(null), async (req, res) => {
        // #swagger.tags = ['Account']
        // #swagger.description = 'Logout method'
        await AccountController.logout(req, res);
    })
    .get("/get-session", role(null), async(req, res) => {
        // #swagger.tags = ['Account']
        // #swagger.description = 'Gets user session by user session ID'
        // #swagger.parameters['sessionID'] = { in: 'headers', description: 'User session ID', type: 'string', required: true }
        await AccountController.getSession(req, res);
    })
    .get("/get-user", role(null), async(req, res) => {
        // #swagger.tags = ['Account']
        // #swagger.description = 'Gets user account data by user session ID'
        // #swagger.parameters['token'] = { in: 'headers', description: 'User session ID', type: 'string', required: true }
        await AccountController.get(req, res);
    })
    // DEPRECATED METHOD
    .get("/get-user-by-token", role(null), async (req, res) => {
        // #swagger.tags = ['Account']
        // #swagger.ignore = true
        // #swagger.description = 'Gets user account data by user token'
        // #swagger.parameters['token'] = { in: 'headers', description: 'User access token', type: 'string', required: true }
        await AccountController.getByToken(req, res);
    })

export default router;