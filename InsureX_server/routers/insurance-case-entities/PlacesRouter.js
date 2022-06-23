'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import PlacesController from "../../controllers/component-entities/PlacesController.js";

const router = express.Router();

router

    // Place is a specific object that represent {'toJob', 'onJob', 'fromJob'} enum.
    // We cannot create and update them!

    // Places in insurance case
    .get("/:case_id/place", role(null), async(req, res) => {
        // #swagger.tags = ['Places', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case places'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await PlacesController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/place/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Places', 'Insurance Cases']
        // #swagger.description = 'Gets a place with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of place', type: 'integer', required: true}
        await PlacesController.findInInsuranceCase(req, res);
    })
    .patch("/:case_id/place/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Places', 'Insurance Cases']
        // #swagger.description = 'Appends place to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of place', type: 'integer', required: true}
        await PlacesController.appendInsuranceCase(req, res);
    })
    .delete("/:case_id/place/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Places', 'Insurance Cases']
        // #swagger.description = 'Removes place from insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of place', type: 'integer', required: true}
        await PlacesController.removeInsuranceCase(req, res);
    })

export default router;