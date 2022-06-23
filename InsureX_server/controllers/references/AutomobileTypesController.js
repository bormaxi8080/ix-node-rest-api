'use strict';

import ControllerModelBase from "../base/ControllerModelBase.js";

import AutomobileTypesModel from "../../models/references/AutomobileTypesModel.js";

class AutomobileTypesController extends ControllerModelBase {
    // Only specific controller methods here

}

const automobileTypesController = new AutomobileTypesController(AutomobileTypesModel);

export default automobileTypesController;