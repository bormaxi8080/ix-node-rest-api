'use strict';

import ControllerModelBase from "../base/ControllerModelBase.js";

import SupplierTypesModel from "../../models/references/SupplierTypesModel.js";

class SupplierTypesController extends ControllerModelBase {
    // Only specific controller methods here

}

const supplierTypesController = new SupplierTypesController(SupplierTypesModel);

export default supplierTypesController;