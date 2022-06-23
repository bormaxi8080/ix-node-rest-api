'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

const Regions = {
    name: 'regions',
    itemName: 'region',
    tableName: 'regions',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        region_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        indexes: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }
}

class RegionsModel extends ModelBase {
    // Only model specific methods here

}

const regionsModel = new RegionsModel(Regions);

export default regionsModel;

