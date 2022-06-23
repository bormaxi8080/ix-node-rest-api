'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import PlacesController from "../../controllers/component-entities/PlacesController.js";

const router = express.Router();

router

    // Place is a specific object that represent {'toJob', 'onJob', 'fromJob'} enum.
    // We cannot create and update them!

    // Places
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Places']
        // #swagger.description = 'Gets array of all places'
        await PlacesController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Places']
        // #swagger.description = 'Gets place by ID'
        // #swagger.parameters['id'] = { description: 'ID of place', type: 'integer', required: true}
        await PlacesController.findById(req, res);
    })

export default router;