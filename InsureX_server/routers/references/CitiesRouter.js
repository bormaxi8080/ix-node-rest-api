'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import CitiesController from "../../controllers/references/CitiesController.js";

const router = express.Router();

router

    .get("/", role(null), async (req, res) => {
        // #swagger.tags = ['Cities']
        // #swagger.description = 'Gets array of all cities'
        // #swagger.parameters['region_id'] = { description: 'Filter by ID of region', type: 'integer', required: false }
        // #swagger.parameters['city_name'] = { description: 'Filter by city name', type: 'string', required: false }
        req.query ? await CitiesController.filter(req, res) : await CitiesController.findAll(req, res);
    })
    .get("/:id", role(null), async (req, res) => {
        // #swagger.tags = ['Cities']
        // #swagger.description = 'Gets city by ID'
        // #swagger.parameters['id'] = { description: 'ID of city', type: 'integer', required: true}
        await CitiesController.findById(req, res);
    })

export default router;