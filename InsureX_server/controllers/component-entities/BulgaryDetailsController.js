'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import BulgaryDetailsModel from "../../models/component-entities/BulgaryDetailsModel.js";

class BulgaryDetailsController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const bulgaryDetailsController = new BulgaryDetailsController(BulgaryDetailsModel);

export default bulgaryDetailsController;