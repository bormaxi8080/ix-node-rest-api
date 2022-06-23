'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const BulgaryDetails = {
    name: 'bulgary_details',
    itemName: 'bulgary_detail',
    tableName: 'bulgary_details',
    fields: {
        /*
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },*/
        sum: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },
        is_owner_single: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        has_damage_earlier: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        has_additional_insurance: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        additional_insurance_info: {
            allowNull: true,
            type: DataTypes.STRING
        },
        has_evidences: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        has_police_call: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class BulgaryDetailsModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const bulgaryDetailsModel = new BulgaryDetailsModel(BulgaryDetails);

export default bulgaryDetailsModel;