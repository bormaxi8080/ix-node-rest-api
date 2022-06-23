'use strict';

import UserEntityControllerBase from "../base/UserEntityControllerBase.js";

import AgentsModel from "../../models/user-entities/AgentsModel.js";

class AgentsController extends UserEntityControllerBase {
    // Only specific controller methods here

}

const agentsController = new AgentsController(AgentsModel);

export default agentsController;