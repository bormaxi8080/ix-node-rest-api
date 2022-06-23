'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";
import QueryUtils from "../../utils/QueryUtils.js";

const Victims = {
    name: 'victims',
    itemName: 'victim',
    tableName: 'victims',
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
            allowNull: true,
            type: DataTypes.STRING
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: true,
            type: DataTypes.STRING
        },
        city_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class VictimsModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here
    
    _mutateFields(fields) {
        let city_ids = fields.city_ids;
        if (city_ids) {
            if (!Array.isArray(city_ids)) {
                fields.city_ids = QueryUtils.fieldToArray(city_ids);
            }
        }
        return super._mutateFields(fields);
    }
}

const victimsModel = new VictimsModel(Victims);

export default victimsModel;