'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const Drivers = {
    name: 'drivers',
    itemName: 'driver',
    tableName: 'drivers',
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
        birthday: {
            allowNull: true,
            type: DataTypes.DATE
        },
        phone: {
            allowNull: true,
            type: DataTypes.STRING
        },
        license_number: {
            allowNull: true,
            type: DataTypes.STRING
        },
        car_model: {
            allowNull: true,
            type: DataTypes.STRING
        },
        has_permission: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        driver_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class DriversModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const driversModel = new DriversModel(Drivers);

export default driversModel;