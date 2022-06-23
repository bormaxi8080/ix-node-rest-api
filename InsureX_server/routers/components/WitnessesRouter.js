'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import WitnessesController from "../../controllers/component-entities/WitnessesController.js";

const router = express.Router();

router

    // Witnesses
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses']
        // #swagger.description = 'Gets array of all witnesses'
        await WitnessesController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses']
        // #swagger.description = 'Gets witness by ID'
        // #swagger.parameters['id'] = { description: 'ID of witness', type: 'integer', required: true}
        await WitnessesController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses']
        // #swagger.description = 'Creates a new witness'
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of witness', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone of witness', type: 'string', required: true }
        await WitnessesController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses']
        // #swagger.description = 'Updates an existing witness'
        // #swagger.parameters['id'] = { description: 'ID of witness', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of witness', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone of witness', type: 'string', required: false }
        await WitnessesController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses']
        // #swagger.description = 'Deletes a witness'
        // #swagger.parameters['id'] = { description: 'ID of witness', type: 'integer', required: true}
        await WitnessesController.delete(req, res);
    })

export default router;