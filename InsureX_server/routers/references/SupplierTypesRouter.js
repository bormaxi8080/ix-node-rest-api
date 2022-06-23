'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import SupplierTypesController from "../../controllers/references/SupplierTypesController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Supplier Types']
        // #swagger.description = 'Gets array of all supplier types'
        await SupplierTypesController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Supplier Types']
        // #swagger.description = 'Gets supplier type by ID'
        // #swagger.parameters['id'] = { description: 'ID of supplier type', type: 'integer', required: 'true' }
        await SupplierTypesController.findById(req, res);
    })

export default router;