'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../services/db/sequelizer.js";

import ModelBase from "./base/ModelBase.js";

import SDPModel from "../models/user-entities/SDPModel.js";
import AppraisersModel from "./user-entities/AppraisersModel.js";
import InsuranceCasesModel from "./InsuranceCasesModel.js";

const Meetings = {
    name: 'meetings',
    itemName: 'meeting',
    tableName: 'meetings',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        sdp_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        appraiser_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        insurance_case_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        approved: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        accepted: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        }
    }
}

class MeetingsModel extends ModelBase {
    // Only specific model methods here

    async _extend(item) {
        if (item && this.extend) {
            const sdp = await SDPModel.findById(item.dataValues.sdp_id);
            const appraiser = await AppraisersModel.findById(item.dataValues.appraiser_id);
            const insurance_case = await InsuranceCasesModel.findById(item.dataValues.insurance_case_id);

            item.dataValues.sdp = sdp;
            item.dataValues.appraiser = appraiser;
            item.dataValues.insurance_case = insurance_case;
        }
        return item;
    }

    async filter(query) {
        if (query.start_date && query.end_date) {
            let condition = {
                where: {
                    date: {
                        [Op.between]: [new Date(query.start_date), new Date(query.end_date)]
                    }
                }
            };

            if (query.sdp_id) {
                condition.where.sdp_id = query.sdp_id;
            }
            if (query.appraiser_id) {
                condition.where.appraiser_id = query.appraiser_id;
            }
            if (query.insurance_case_id) {
                condition.where.appraiser_id = query.appraiser_id;
            }

            return await this.model.findAll(condition);
        } else {
                return await super.filter(query);
        }
    }
}

const meetingsModel = new MeetingsModel(Meetings);

export default meetingsModel;