'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../services/db/sequelizer.js";

import ModelBase from "./base/ModelBase.js";

import InsuredCasesModel from "./InsuranceCasesModel.js";
import InsuredPersonsModel from "./user-entities/InsuredPersonsModel.js";
import InsuranceCompaniesModel from "./user-entities/InsuranceCompaniesModel.js";
import AgentsModel from "./user-entities/AgentsModel.js";
import AppraisersModel from "./user-entities/AppraisersModel.js";
import AppraisalCompaniesModel from "./user-entities/AppraisalCompaniesModel.js";
import RegionsModel from "./references/RegionsModel.js";
import InsuredEventsFilesModel from "./InsuredEventsFilesModel.js";

const InsuredEvents = {
    name: 'insured_events',
    itemName: 'insured_event',
    tableName: 'insured_events',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        insured_person_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        insurance_company_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        region_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        agent_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        appraisal_company_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        appraiser_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        date: {
            allowNull: true,
            type: DataTypes.DATE
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        insured_event_number: {
            allowNull: true,
            type: DataTypes.STRING
        },
        folder_google_drive_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        folder_google_drive_link: {
            allowNull: true,
            type: DataTypes.STRING
        },
        folder_google_drive_name: {
            allowNull: true,
            type: DataTypes.STRING
        }
        /*
        // DEPRECATED
        event_type: {
            allowNull: true,
            type: DataTypes.STRING
        },
        // DEPRECATED
        garage_name: {
            allowNull: true,
            type: DataTypes.STRING
        }
        */
    }
}

class InsuredEventsModel extends ModelBase {
    // Only specific model methods here

    async _extend(item) {
        if (item && this.extend) {
            const insured_person = await InsuredPersonsModel.findById(item.dataValues.insured_person_id);
            //const insurance_company = await InsuranceCompaniesModel.findById(item.dataValues.insurance_company_id);
            //const agent = await AgentsModel.findById(item.dataValues.agent_id);
            //const appraiser = await AppraisersModel.findById(item.dataValues.appraiser_id);
            //const appraisal_company = await AppraisalCompaniesModel.findById(item.dataValues.appraisal_company_id);
            //const region = await RegionsModel.findById(item.dataValues.region_id);
            const insured_events_files = await InsuredEventsFilesModel.findByInsuredEventId(item.dataValues.id);

            item.dataValues.insured_person = insured_person;
            //item.dataValues.insurance_company = insurance_company;
            //item.dataValues.agent = agent;
            //item.dataValues.appraiser = appraiser;
            //item.dataValues.appraisal_company = appraisal_company;
            //item.dataValues.region = region;
            item.dataValues.files = insured_events_files;
        }
        return item;
    }

    async filter(query) {
        if (query.case_id) {
            const item = await InsuredCasesModel.findById(query.case_id);
            if (item) {
                let items = await super.filter({id: item.dataValues.insured_event_id});
                //for (let item of items) {
                //    item = await this._extend(item);
                //}
                return items;
            } else {
                return [];
            }
        } else {
            return await super.filter(query);
        }
    }
}

const insuredEventsModel = new InsuredEventsModel(InsuredEvents);

export default insuredEventsModel;