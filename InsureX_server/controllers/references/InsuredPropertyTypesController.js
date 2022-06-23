'use strict';

import ControllerModelBase from "../base/ControllerModelBase.js";

import InsuredPropertyTypesModel from "../../models/references/InsuredPropertyTypesModel.js";;

class InsuredPropertyTypesController extends ControllerModelBase {
    // Only specific controller methods here

}

const insuredPropertyTypesController = new InsuredPropertyTypesController(InsuredPropertyTypesModel);

export default insuredPropertyTypesController;