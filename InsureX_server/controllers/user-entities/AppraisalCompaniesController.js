'use strict';

import UserEntityControllerBase from "../base/UserEntityControllerBase.js";

import AppraisalCompaniesModel from "../../models/user-entities/AppraisalCompaniesModel.js";

class AppraisalCompaniesController extends UserEntityControllerBase {
    // Only specific controller methods here

}

const appraisalCompaniesController = new AppraisalCompaniesController(AppraisalCompaniesModel);

export default appraisalCompaniesController;