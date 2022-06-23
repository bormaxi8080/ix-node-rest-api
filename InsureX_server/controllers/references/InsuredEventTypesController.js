'use strict';

import ControllerModelBase from "../base/ControllerModelBase.js";

import InsuredEventTypesModel from "../../models/references/InsuredEventTypesModel.js";

class InsuredEventTypesController extends ControllerModelBase {
    // Only specific controller methods here

}

const insuredEventTypesController = new InsuredEventTypesController(InsuredEventTypesModel);

export default insuredEventTypesController;