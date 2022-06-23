'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import EstatesController from "../../controllers/component-entities/EstatesController.js";


const router = express.Router();

router

    // Estates in insurance case
    .get("/:case_id/estate", role(null), async(req, res) => {
        // #swagger.tags = ['Estates', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case estates'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await EstatesController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/estate/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Estates', 'Insurance Cases']
        // #swagger.description = 'Gets a estate with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of estate', type: 'integer', required: true}
        await EstatesController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/estate", role(null), async(req, res) => {
        // #swagger.tags = ['Estates', 'Insurance Cases']
        // #swagger.description = 'Creates a new estate and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['damage_amount'] = { in: 'body', description: 'Estate damage amount', type: 'double', required: false }
        // #swagger.parameters['single_owner'] = { in: 'body', description: 'Is owner single', type: 'boolean', required: false }
        // #swagger.parameters['were_damaged'] = { in: 'body', description: 'Is were damaged', type: 'boolean', required: false }
        // #swagger.parameters['has_additional_insurance'] = { in: 'body', description: 'Has additional insurance', type: 'boolean', required: false }
        // #swagger.parameters['additional_insurance_info'] = { in: 'body', description: 'Additional insurance info', type: 'string', required: false }
        // #swagger.parameters['has_tenant'] = { in: 'body', description: '', type: 'boolean', required: false }
        await EstatesController.create(req, res);
    })
    .patch("/:case_id/estate/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Estates', 'Insurance Cases']
        // #swagger.description = 'Appends estate to insurance case and update it (no creates estate!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of estate', type: 'integer', required: true}
        // #swagger.parameters['damage_amount'] = { in: 'body', description: 'Estate damage amount', type: 'double', required: false }
        // #swagger.parameters['single_owner'] = { in: 'body', description: 'Is owner single', type: 'boolean', required: false }
        // #swagger.parameters['were_damaged'] = { in: 'body', description: 'Is were damaged', type: 'boolean', required: false }
        // #swagger.parameters['has_additional_insurance'] = { in: 'body', description: 'Has additional insurance', type: 'boolean', required: false }
        // #swagger.parameters['additional_insurance_info'] = { in: 'body', description: 'Additional insurance info', type: 'string', required: false }
        // #swagger.parameters['has_tenant'] = { in: 'body', description: '', type: 'boolean', required: false }
        await EstatesController.update(req, res);
    })
    .delete("/:case_id/estate/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Estates', 'Insurance Cases']
        // #swagger.description = 'Remove estate from insurance case (no deletes estate!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of estate', type: 'integer', required: true}
        await EstatesController.delete(req, res);
    })

export default router;