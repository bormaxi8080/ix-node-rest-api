'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const Estates = {
    name: 'estates',
    itemName: 'estate',
    tableName: 'estates',
    fields: {
        /*
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },*/
        damage_amount: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },
        single_owner: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        were_damaged: {
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
        has_tenant: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class EstatesModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const estatesModel = new EstatesModel(Estates);

export default estatesModel;