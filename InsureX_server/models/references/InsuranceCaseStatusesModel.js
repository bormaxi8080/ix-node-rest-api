'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

const InsuranceCaseStatuses = {
    name: 'insurance_case_statuses',
    itemName: 'insurance_case_status',
    tableName: 'insurance_case_statuses',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        ru_description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        inbox_notification: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        }
    }
}

class InsuranceCaseStatusesModel extends ModelBase {
    // Only model specific methods here

}

const insuranceCaseStatusesModel = new InsuranceCaseStatusesModel(InsuranceCaseStatuses);

export default insuranceCaseStatusesModel;