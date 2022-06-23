'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import AutomobileTypesController from "../../controllers/references/AutomobileTypesController.js";

const router = express.Router();

router

    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Automobile Types']
        // #swagger.description = 'Gets array of automobile types'
        await AutomobileTypesController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Automobile Types']
        // #swagger.description = 'Gets automobile type by ID'
        // #swagger.parameters['id'] = { description: 'ID of automobile type', type: 'integer', required: true}
        await AutomobileTypesController.findById(req, res);
    })

export default router;