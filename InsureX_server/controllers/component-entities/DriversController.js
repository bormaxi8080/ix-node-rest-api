'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import DriversModel from "../../models/component-entities/DriversModel.js";

class DriversController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const driversController = new DriversController(DriversModel);

export default driversController;