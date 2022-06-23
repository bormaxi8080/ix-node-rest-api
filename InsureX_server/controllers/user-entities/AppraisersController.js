'use strict';

import UserEntityControllerBase from "../base/UserEntityControllerBase.js";

import AppraisersModel from "../../models/user-entities/AppraisersModel.js";

class AppraisersController extends UserEntityControllerBase {
    // Only specific controller methods here

}

const appraisersController = new AppraisersController(AppraisersModel);

export default appraisersController;