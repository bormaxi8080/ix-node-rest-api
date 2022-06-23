'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import BulgaryDetailsController from "../../controllers/component-entities/BulgaryDetailsController.js";

const router = express.Router();

router

    // Bulgary Details
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details']
        // #swagger.description = 'Gets all bulgary details objects'
        await BulgaryDetailsController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details']
        // #swagger.description = 'Gets bulgary detail by ID'
        // #swagger.parameters['id'] = { description: 'ID of bulgary detail', type: 'integer', required: true}
        await BulgaryDetailsController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details']
        // #swagger.description = 'Creates a new bulgary detail'
        // #swagger.parameters['sum'] = { in: 'body', description: 'Sum of bulgary detail', type: 'double', required: false }
        // #swagger.parameters['is_owner_single'] = { in: 'body', description: 'Is owner single', type: 'boolean', required: false }
        // #swagger.parameters['has_damage_earlier'] = { in: 'body', description: 'Has damage earlier', type: 'boolean', required: false }
        // #swagger.parameters['has_additional_insurance'] = { in: 'body', description: 'Has additional insurance', type: 'boolean', required: false }
        // #swagger.parameters['additional_insurance_info'] = { in: 'body', description: 'Additional insurance info', type: 'string', required: false }
        // #swagger.parameters['has_evidences'] = { in: 'body', description: 'Has evidences', type: 'boolean', required: false }
        // #swagger.parameters['has_police_call'] = { in: 'body', description: 'Has police call', type: 'boolean', required: false }
        await BulgaryDetailsController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details']
        // #swagger.description = 'Updates an existing bulgary detail'
        // #swagger.parameters['id'] = { description: 'ID of bulgary detail', type: 'integer', required: true}
        // #swagger.parameters['sum'] = { in: 'body', description: 'Sum of bulgary detail', type: 'double', required: false }
        // #swagger.parameters['is_owner_single'] = { in: 'body', description: 'Is owner single', type: 'boolean', required: false }
        // #swagger.parameters['has_damage_earlier'] = { in: 'body', description: 'Has damage earlier', type: 'boolean', required: false }
        // #swagger.parameters['has_additional_insurance'] = { in: 'body', description: 'Has additional insurance', type: 'boolean', required: false }
        // #swagger.parameters['additional_insurance_info'] = { in: 'body', description: 'Additional insurance info', type: 'string', required: false }
        // #swagger.parameters['has_evidences'] = { in: 'body', description: 'Has evidences', type: 'boolean', required: false }
        // #swagger.parameters['has_police_call'] = { in: 'body', description: 'Has police call', type: 'boolean', required: false }
        await BulgaryDetailsController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details']
        // #swagger.description = 'Deletes a witness'
        // #swagger.parameters['id'] = { description: 'ID of bulgary detail', type: 'integer', required: true}
        await BulgaryDetailsController.delete(req, res);
    })

export default router;