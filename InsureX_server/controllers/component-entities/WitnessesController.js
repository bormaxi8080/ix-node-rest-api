'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import WitnessesModel from "../../models/component-entities/WitnessesModel.js";

class WitnessesController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const witnessesController = new WitnessesController(WitnessesModel);

export default witnessesController;