'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import InsuredEventTypesController from "../../controllers/references/InsuredEventTypesController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Event Types']
        // #swagger.description = 'Gets array of all insured events types'
        await InsuredEventTypesController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Insured Event Types']
        // #swagger.description = 'Gets insured event type by ID'
        // #swagger.parameters['id'] = { description: 'ID of event type', type: 'integer', required: true}
        await InsuredEventTypesController.findById(req, res);
    })

export default router;