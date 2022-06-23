'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import EstatesController from "../../controllers/component-entities/EstatesController.js";


const router = express.Router();

router

    // Estates
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Estates']
        // #swagger.description = 'Gets array of all estates'
        await EstatesController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Estates']
        // #swagger.description = 'Gets estate by ID'
        // #swagger.parameters['id'] = { description: 'ID of estate', type: 'integer', required: true}
        await EstatesController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Estates']
        // #swagger.description = 'Creates a new estate'
        // #swagger.parameters['damage_amount'] = { in: 'body', description: 'Estate damage amount', type: 'double', required: false }
        // #swagger.parameters['single_owner'] = { in: 'body', description: 'Is owner single', type: 'boolean', required: false }
        // #swagger.parameters['were_damaged'] = { in: 'body', description: 'Is were damaged', type: 'boolean', required: false }
        // #swagger.parameters['has_additional_insurance'] = { in: 'body', description: 'Has additional insurance', type: 'boolean', required: false }
        // #swagger.parameters['additional_insurance_info'] = { in: 'body', description: 'Additional insurance info', type: 'string', required: false }
        // #swagger.parameters['has_tenant'] = { in: 'body', description: '', type: 'boolean', required: false }
        await EstatesController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Estates']
        // #swagger.description = 'Updates an existing estate'
        // #swagger.parameters['id'] = { description: 'ID of estate', type: 'integer', required: true}
        // #swagger.parameters['damage_amount'] = { in: 'body', description: 'Estate damage amount', type: 'double', required: false }
        // #swagger.parameters['single_owner'] = { in: 'body', description: 'Is owner single', type: 'boolean', required: false }
        // #swagger.parameters['were_damaged'] = { in: 'body', description: 'Is were damaged', type: 'boolean', required: false }
        // #swagger.parameters['has_additional_insurance'] = { in: 'body', description: 'Has additional insurance', type: 'boolean', required: false }
        // #swagger.parameters['additional_insurance_info'] = { in: 'body', description: 'Additional insurance info', type: 'string', required: false }
        // #swagger.parameters['has_tenant'] = { in: 'body', description: '', type: 'boolean', required: false }
        await EstatesController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Estates']
        // #swagger.description = 'Deletes a estate'
        // #swagger.parameters['id'] = { description: 'ID of estate', type: 'integer', required: true}
        await EstatesController.delete(req, res);
    })

export default router;