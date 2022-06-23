'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import IncidentParticipantsModel from "../../models/component-entities/IncidentParticipantsModel.js";

class IncidentParticipantsController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const incidentParticipantsController = new IncidentParticipantsController(IncidentParticipantsModel);

export default incidentParticipantsController;