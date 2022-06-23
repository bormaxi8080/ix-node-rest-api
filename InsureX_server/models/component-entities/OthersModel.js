'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const Others = {
    name: 'others',
    itemName: 'others',
    tableName: 'others',
    fields: {
        /*
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },*/
        names: {
            allowNull: false,
            type: DataTypes.STRING
        },
        license_number: {
            allowNull: true,
            type: DataTypes.STRING
        },
        passport_number: {
            allowNull: true,
            type: DataTypes.STRING
        },
        car_model: {
            allowNull: true,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: true,
            type: DataTypes.STRING
        },
        is_sue: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class OthersModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const othersModel = new OthersModel(Others);

export default othersModel;