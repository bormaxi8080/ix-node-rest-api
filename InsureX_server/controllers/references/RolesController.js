'use strict';

import ControllerModelBase from "../base/ControllerModelBase.js";

import RolesModel from "../../models/references/RolesModel.js";

class RolesController extends ControllerModelBase {
    // Only specific controller methods here

}

const rolesController = new RolesController(RolesModel);

export default rolesController;