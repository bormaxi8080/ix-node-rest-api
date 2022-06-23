'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import IncidentParticipantsController from "../../controllers/component-entities/IncidentParticipantsController.js";

const router = express.Router();

router

    // Incident participants
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants']
        // #swagger.description = 'Gets array of all incident participants'
        await IncidentParticipantsController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants']
        // #swagger.description = 'Gets incident participant by ID'
        // #swagger.parameters['id'] = { description: 'ID of incident participant', type: 'integer', required: true}
        await IncidentParticipantsController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants']
        // #swagger.description = 'Creates a new incident participant'
        // #swagger.parameters['police'] = { in: 'body', description: 'Has police participant(s)', type: 'boolean', required: false }
        // #swagger.parameters['firefighters'] = { in: 'body', description: 'Has firefighters participant(s)', type: 'boolean', required: false }
        // #swagger.parameters['tow_truck'] = { in: 'body', description: 'Has Tow Truck participant(s)', type: 'boolean', required: false }
        await IncidentParticipantsController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants']
        // #swagger.description = 'Updates an existing incident participant'
        // #swagger.parameters['id'] = { description: 'ID of incident participant', type: 'integer', required: true}
        // #swagger.parameters['police'] = { in: 'body', description: 'Has police participant(s)', type: 'boolean', required: false }
        // #swagger.parameters['firefighters'] = { in: 'body', description: 'Has firefighters participant(s)', type: 'boolean', required: false }
        // #swagger.parameters['tow_truck'] = { in: 'body', description: 'Has Tow Truck participant(s)', type: 'boolean', required: false }
        await IncidentParticipantsController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants']
        // #swagger.description = 'Deletes an incident participant'
        await IncidentParticipantsController.delete(req, res);
    })

export default router;