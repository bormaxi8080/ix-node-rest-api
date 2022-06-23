'use strict';

import ControllerModelBase from "../base/ControllerModelBase.js";

import CitiesModel from "../../models/references/CitiesModel.js";

class CitiesController extends ControllerModelBase {
    // Only specific controller methods here

}

const citiesController = new CitiesController(CitiesModel);

export default citiesController;