'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const Witnesses = {
    name: 'witnesses',
    itemName: 'witness',
    tableName: 'witnesses',
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
        phone: {
            allowNull: true,
            type: DataTypes.STRING
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class WitnessesModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const witnessesModel = new WitnessesModel(Witnesses);

export default witnessesModel;