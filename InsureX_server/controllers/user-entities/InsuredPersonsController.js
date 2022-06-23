'use strict';

import UserEntityControllerBase from "../base/UserEntityControllerBase.js";

import InsuredPersonsModel from "../../models/user-entities/InsuredPersonsModel.js";

class InsuredPersonsController extends UserEntityControllerBase {
    // Only specific controller methods here
    
}

const insuredPersonsController = new InsuredPersonsController(InsuredPersonsModel);

export default insuredPersonsController;
