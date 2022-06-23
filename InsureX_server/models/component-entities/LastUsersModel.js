'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const LastUsers = {
    name: 'last_users',
    itemName: 'last_user',
    tableName: 'last_users',
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
        passport_id: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: true,
            type: DataTypes.STRING
        },
        relationship: {
            allowNull: true,
            type: DataTypes.STRING
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
    }
}

class LastUsersModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const lastUsersModel = new LastUsersModel(LastUsers);

export default lastUsersModel;