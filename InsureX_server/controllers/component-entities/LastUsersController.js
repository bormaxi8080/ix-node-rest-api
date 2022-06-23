'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import LastUsersModel from "../../models/component-entities/LastUsersModel.js";

class LastUsersController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const lastUsersController = new LastUsersController(LastUsersModel);

export default lastUsersController;