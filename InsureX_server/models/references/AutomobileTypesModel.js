'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

const AutomobileTypes = {
    name: 'automobile_types',
    itemName: 'automobile_type',
    tableName: 'automobile_types',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        automobile_type: {
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

class AutomobileTypesModel extends ModelBase {
    // Only model specific methods here

}

const automobileTypesModel = new AutomobileTypesModel(AutomobileTypes);

export default automobileTypesModel;