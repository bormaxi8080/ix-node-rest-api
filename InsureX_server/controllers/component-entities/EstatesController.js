'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import EstatesModel from "../../models/component-entities/EstatesModel.js";

class EstatesController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const estatesController = new EstatesController(EstatesModel);

export default estatesController;