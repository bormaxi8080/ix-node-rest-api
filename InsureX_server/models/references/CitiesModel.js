'use strict';

import {DataTypes} from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

import RegionsModel from "./RegionsModel.js";

const Cities = {
    name: 'cities',
    itemName: 'city',
    tableName: 'cities',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        city_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        region_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        index: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }
}

class CitiesModel extends ModelBase {
    // Only specific model methods here

    async _extend(item) {
        if (item && this.extend) {
            const region_id = item.dataValues.region_id;
            if (region_id) {
                item.dataValues.region = await RegionsModel.findById(region_id);
            }
        }
        return item;
    }
}

const citiesModel = new CitiesModel(Cities);

export default citiesModel;