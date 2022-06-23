'use strict';

import UserEntityControllerBase from "../base/UserEntityControllerBase.js";

import SDPModel from "../../models/user-entities/SDPModel.js";

class SDPController extends UserEntityControllerBase {
    // Only specific controller methods here

}

const sdpController = new SDPController(SDPModel);

export default sdpController;