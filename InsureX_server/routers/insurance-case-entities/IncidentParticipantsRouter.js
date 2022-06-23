'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import IncidentParticipantsController from "../../controllers/component-entities/IncidentParticipantsController.js";

const router = express.Router();

router

    // Incident participants in insurance case
    .get("/:case_id/incident-participant", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case incident participants'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await IncidentParticipantsController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/incident-participant/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants', 'Insurance Cases']
        // #swagger.description = 'Gets an incident participant with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of incident participant', type: 'integer', required: true}
        await IncidentParticipantsController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/incident-participant", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants', 'Insurance Cases']
        // #swagger.description = 'Creates a new incident participant and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['police'] = { in: 'body', description: 'Has police participant(s)', type: 'boolean', required: false }
        // #swagger.parameters['firefighters'] = { in: 'body', description: 'Has firefighters participant(s)', type: 'boolean', required: false }
        // #swagger.parameters['tow_truck'] = { in: 'body', description: 'Has Tow Truck participant(s)', type: 'boolean', required: false }
        await IncidentParticipantsController.create(req, res);
    })
    .patch("/:case_id/incident-participant/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants', 'Insurance Cases']
        // #swagger.description = 'Appends an incident participant to insurance case and update it (no creates incident participant!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of incident participant', type: 'integer', required: true}
        // #swagger.parameters['police'] = { in: 'body', description: 'Has police participant(s)', type: 'boolean', required: false }
        // #swagger.parameters['firefighters'] = { in: 'body', description: 'Has firefighters participant(s)', type: 'boolean', required: false }
        // #swagger.parameters['tow_truck'] = { in: 'body', description: 'Has Tow Truck participant(s)', type: 'boolean', required: false }
        await IncidentParticipantsController.update(req, res);
    })
    .delete("/:case_id/incident-participant/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Incident Participants', 'Insurance Cases']
        // #swagger.description = 'Remove incident participant from insurance case (no deletes incident participant!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of incident participant', type: 'integer', required: true}
        await IncidentParticipantsController.delete(req, res);
    })

export default router;