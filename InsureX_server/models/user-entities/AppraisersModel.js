'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import UserEntityModelBase from "../base/UserEntityModelBase.js";

import RegionsModel from "../references/RegionsModel.js";

const Appraisers = {
    name: 'appraisers',
    itemName: 'appraiser',
    tableName: 'appraisers',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        insurance_company_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        appraisal_company_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        region_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        passport_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        second_name: {
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
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        login_id: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }
}

class AppraisersModel extends UserEntityModelBase {
    // Only specific model methods here

    /*
    async _extend(item) {
        if (item && this.extend) {
            item.dataValues.region = await RegionsModel.findById(item.dataValues.region_id);
        }
        return item;
    }
    */
}

const appraisersModel = new AppraisersModel(Appraisers);

export default appraisersModel;