'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import VictimsModel from "../../models/component-entities/VictimsModel.js";

class VictimsController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const victimsController = new VictimsController(VictimsModel);

export default victimsController;