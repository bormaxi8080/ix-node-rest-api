'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import TheftDetailsModel from "../../models/component-entities/TheftTimeIntervalsModel.js";

class TheftTimeIntervalsController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const theftDetailsController = new TheftTimeIntervalsController(TheftDetailsModel);

export default theftDetailsController;