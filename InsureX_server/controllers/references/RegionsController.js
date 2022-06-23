'use strict';

import ControllerModelBase from "../base/ControllerModelBase.js";

import RegionsModel from "../../models/references/RegionsModel.js";

class RegionsController extends ControllerModelBase {
    // Only specific controller methods here

}

const regionsController = new RegionsController(RegionsModel);

export default regionsController;