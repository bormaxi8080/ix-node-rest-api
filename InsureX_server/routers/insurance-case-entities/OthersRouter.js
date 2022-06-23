'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import OthersController from "../../controllers/component-entities/OthersController.js";

const router = express.Router();

router

    // Others in insurance case
    .get("/:case_id/other", role(null), async(req, res) => {
        // #swagger.tags = ['Others', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case other persons'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await OthersController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/other/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Others', 'Insurance Cases']
        // #swagger.description = 'Gets a other person with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of other person', type: 'integer', required: true}
        await OthersController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/other", role(null), async(req, res) => {
        // #swagger.tags = ['Others', 'Insurance Cases']
        // #swagger.description = 'Creates a new other person and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of other person', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of other person', type: 'string', required: true }
        // #swagger.parameters['license_number'] = { in: 'body', description: 'License number', type: 'string', required: false }
        // #swagger.parameters['passport_number'] = { in: 'body', description: 'Passport number of other person', type: 'string', required: false }
        // #swagger.parameters['car_model'] = { in: 'body', description: 'Car model of other person', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone of other person', type: 'string', required: false }
        // #swagger.parameters['is_sue'] = { in: 'body', description: 'Is other person sue', type: 'boolean', required: false }
        await OthersController.create(req, res);
    })
    .patch("/:case_id/other/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Others', 'Insurance Cases']
        // #swagger.description = 'Appends a other person to insurance case and update it (no creates witness!!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of other person', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of other person', type: 'integer', required: true}
        // #swagger.parameters['names'] = { in: 'body', description: 'Names of other person', type: 'string', required: false }
        // #swagger.parameters['license_number'] = { in: 'body', description: 'License number', type: 'string', required: false }
        // #swagger.parameters['passport_number'] = { in: 'body', description: 'Passport number of other person', type: 'string', required: false }
        // #swagger.parameters['car_model'] = { in: 'body', description: 'Car model of other person', type: 'string', required: false }
        // #swagger.parameters['phone'] = { in: 'body', description: 'Phone of other person', type: 'string', required: false }
        // #swagger.parameters['is_sue'] = { in: 'body', description: 'Is other person sue', type: 'boolean', required: false }
        await OthersController.update(req, res);
    })
    .delete("/:case_id/other/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Others', 'Insurance Cases']
        // #swagger.description = 'Remove other person from insurance case (no deletes other person!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of other person', type: 'integer', required: true}
        await OthersController.delete(req, res);
    })

export default router;