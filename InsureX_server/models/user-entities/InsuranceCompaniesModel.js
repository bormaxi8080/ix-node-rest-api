'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import UserEntityModelBase from "../base/UserEntityModelBase.js";

const InsuranceCompanies = {
    name: 'insurance_companies',
    itemName: 'insurance_company',
    tableName: 'insurance_companies',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        ie_number: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        account_id: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }
}

class InsuranceCompaniesModel extends UserEntityModelBase {
    // Only specific model methods here

}

const insuranceCompaniesModel = new InsuranceCompaniesModel(InsuranceCompanies);

export default insuranceCompaniesModel;