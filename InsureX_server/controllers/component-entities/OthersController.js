'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import OthersModel from "../../models/component-entities/OthersModel.js";

class OthersController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const othersController = new OthersController(OthersModel);

export default othersController;