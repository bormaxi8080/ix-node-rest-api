'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import CarsModel from "../../models/component-entities/CarsModel.js";

class CarsController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

}

const carsController = new CarsController(CarsModel);

export default carsController;