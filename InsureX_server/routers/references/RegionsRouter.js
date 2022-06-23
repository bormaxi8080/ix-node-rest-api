'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import RegionsController from "../../controllers/references/RegionsController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Regions']
        // #swagger.description = 'Gets array of all regions objects'
        await RegionsController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Regions']
        // #swagger.description = 'Gets region by ID'
        // #swagger.parameters['id'] = { description: 'ID of region', type: 'integer', required: 'true' }
        await RegionsController.findById(req, res);
    })

export default router;