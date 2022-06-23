'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import InsuredPropertyTypesController from "../../controllers/references/InsuredPropertyTypesController.js";

const router = express.Router();

router

    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Insured Property Types']
        // #swagger.description = 'Gets array of all insured property types'
        await InsuredPropertyTypesController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Insured Property Types']
        // #swagger.description = 'Gets insured property type by ID'
        // #swagger.parameters['id'] = { description: 'ID of property type', type: 'integer', required: true}
        await InsuredPropertyTypesController.findById(req, res);
    })

export default router;