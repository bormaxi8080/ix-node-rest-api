'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const Places = {
    name: 'places',
    itemName: 'place',
    tableName: 'places',
    fields: {
        /*
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },*/
        place: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        ru_description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class PlacesModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const placesModel = new PlacesModel(Places);

export default placesModel;