'use strict';

import UserEntityControllerBase from "../base/UserEntityControllerBase.js";

import InsuranceCompaniesModel from "../../models/user-entities/InsuranceCompaniesModel.js";

class InsuranceCompaniesController extends UserEntityControllerBase {
    // Only specific controller methods here

}

const insuranceCompaniesController = new InsuranceCompaniesController(InsuranceCompaniesModel);

export default insuranceCompaniesController;