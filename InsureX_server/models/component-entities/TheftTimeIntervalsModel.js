'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const TheftTimeIntervals = {
    name: 'theft_time_intervals',
    itemName: 'theft_time_interval',
    tableName: 'theft_time_intervals',
    fields: {
        /*
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },*/
        start_time_interval: {
            allowNull: true,
            type: DataTypes.TIME
        },
        end_time_interval: {
            allowNull: true,
            type: DataTypes.TIME
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
    }
}

class TheftTimeIntervalsModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const theftTimeIntervalsModel = new TheftTimeIntervalsModel(TheftTimeIntervals);

export default theftTimeIntervalsModel;