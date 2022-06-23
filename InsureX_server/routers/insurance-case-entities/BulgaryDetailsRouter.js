'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import BulgaryDetailsController from "../../controllers/component-entities/BulgaryDetailsController.js";

const router = express.Router();

router

    // Bulgary details in insurance case
    .get("/:case_id/bulgary-details", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case bulgary detail'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await BulgaryDetailsController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/bulgary-details/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details', 'Insurance Cases']
        // #swagger.description = 'Gets a bulgary detail with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of bulgary detail', type: 'integer', required: true}
        await BulgaryDetailsController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/bulgary-details", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details', 'Insurance Cases']
        // #swagger.description = 'Creates a new bulgary detail and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['sum'] = { in: 'body', description: 'Sum of bulgary detail', type: 'double', required: false }
        // #swagger.parameters['is_owner_single'] = { in: 'body', description: 'Is owner single', type: 'boolean', required: false }
        // #swagger.parameters['has_damage_earlier'] = { in: 'body', description: 'Has damage earlier', type: 'boolean', required: false }
        // #swagger.parameters['has_additional_insurance'] = { in: 'body', description: 'Has additional insurance', type: 'boolean', required: false }
        // #swagger.parameters['additional_insurance_info'] = { in: 'body', description: 'Additional insurance info', type: 'string', required: false }
        // #swagger.parameters['has_evidences'] = { in: 'body', description: 'Has evidences', type: 'boolean', required: false }
        // #swagger.parameters['has_police_call'] = { in: 'body', description: 'Has police call', type: 'boolean', required: false }
        await BulgaryDetailsController.create(req, res);
    })
    .patch("/:case_id/bulgary-details/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details', 'Insurance Cases']
        // #swagger.description = 'Appends a bulgary detail to insurance case and update it (no creates witness!!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
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
    .delete("/:case_id/bulgary-details/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Bulgary Details', 'Insurance Cases']
        // #swagger.description = 'Remove bulgary detail from insurance case (no deletes witness!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of bulgary detail', type: 'integer', required: true}
        await BulgaryDetailsController.delete(req, res);
    })

export default router;