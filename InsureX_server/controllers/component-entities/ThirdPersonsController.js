'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import ThirdPersonsModel from "../../models/component-entities/ThirdPersonsModel.js";

class ThirdPersonsController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const thirdPersonsController = new ThirdPersonsController(ThirdPersonsModel);

export default thirdPersonsController;