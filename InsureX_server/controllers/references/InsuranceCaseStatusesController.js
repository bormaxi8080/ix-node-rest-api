'use strict';

import ControllerModelBase from "../base/ControllerModelBase.js";

import InsuranceCaseStatusesModel from "../../models/references/InsuranceCaseStatusesModel.js";

class InsuranceCaseStatusesController extends ControllerModelBase {
    // Only specific controller methods here

}

const insuranceCaseStatusesController = new InsuranceCaseStatusesController(InsuranceCaseStatusesModel);

export default insuranceCaseStatusesController;