'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import InsuranceCaseStatusesController from "../../controllers/references/InsuranceCaseStatusesController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insurance Case Statuses']
        // #swagger.description = 'Gets array of all insurance case statuses'
        await InsuranceCaseStatusesController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insurance Case Statuses']
        // #swagger.description = 'Gets insurance case status by ID'
        // #swagger.parameters['id'] = { description: 'ID of insurance case status', type: 'integer', required: true}
        await InsuranceCaseStatusesController.findById(req, res);
    })

export default router;