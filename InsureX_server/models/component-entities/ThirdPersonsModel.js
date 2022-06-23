'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const ThirdPersons = {
    name: 'third_persons',
    itemName: 'third_person',
    tableName: 'third_persons',
    fields: {
        /*
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },*/
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: true,
            type: DataTypes.STRING
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        damage_info: {
            allowNull: true,
            type: DataTypes.STRING
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class ThirdPersonsModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const thirdPersonsModel = new ThirdPersonsModel(ThirdPersons);

export default thirdPersonsModel;