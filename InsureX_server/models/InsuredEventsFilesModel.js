'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../services/db/sequelizer.js";

import ModelBase from "./base/ModelBase.js";

const InsuredEventsFiles = {
    name: 'insured_events_files',
    itemName: 'insured_event_file',
    tableName: 'insured_events_files',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        insured_event_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        link: {
            allowNull: false,
            type: DataTypes.STRING
        },
        file_google_drive_id: {
            allowNull: false,
            type: DataTypes.STRING
        },
        file_type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        file_name: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }
}

class InsuredEventsFilesModel extends ModelBase {
    // Only specific model methods here

    async findByInsuredEventId(insured_event_id) {
        return await this.model.findAll({ where: { insured_event_id: insured_event_id } });
    }

    async deleteByInsuredEventId(insured_event_id) {
        await this.model.destroy({ where: { insured_event_id: insured_event_id } });
    }
}

const insuredEventsFilesModel = new InsuredEventsFilesModel(InsuredEventsFiles);

export default insuredEventsFilesModel;