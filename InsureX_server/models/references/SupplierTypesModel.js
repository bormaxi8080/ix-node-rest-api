'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

const SupplierTypes = {
    name: 'supplier_types',
    itemName: 'supplier_type',
    tableName: 'supplier_types',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        ru_description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }
}

class SupplierTypesModel extends ModelBase {
    // Only model specific methods here

}

const supplierTypesModel = new SupplierTypesModel(SupplierTypes);

export default supplierTypesModel;