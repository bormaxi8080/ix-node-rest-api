'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import WitnessesController from "../../controllers/component-entities/WitnessesController.js";

const router = express.Router();

router

    // Witnesses in insurance case
    .get("/:case_id/witness", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case witnesses'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await WitnessesController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/witness/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses', 'Insurance Cases']
        // #swagger.description = 'Gets a witness with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of witness', type: 'integer', required: true}
        await WitnessesController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/witness", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses', 'Insurance Cases']
        // #swagger.description = 'Creates a new witness and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of witness', type: 'string', required: true }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone of witness', type: 'string', required: true }
        await WitnessesController.create(req, res);
    })
    .patch("/:case_id/witness/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses', 'Insurance Cases']
        // #swagger.description = 'Appends a witness to insurance case and update it (no creates witness!!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of witness', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of witness', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone of witness', type: 'string', required: false }
        await WitnessesController.update(req, res);
    })
    .delete("/:case_id/witness/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Witnesses', 'Insurance Cases']
        // #swagger.description = 'Remove witness from insurance case (no deletes witness!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of witness', type: 'integer', required: true}
        await WitnessesController.delete(req, res);
    })

export default router;