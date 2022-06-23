'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";

const IncidentParticipants = {
    name: 'incident_participants',
    itemName: 'incident_participant',
    tableName: 'incident_participants',
    fields: {
        /*
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },*/
        police: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        firefighters: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        tow_truck: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class IncidentParticipantsModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

}

const incidentParticipantsModel = new IncidentParticipantsModel(IncidentParticipants);

export default incidentParticipantsModel;