'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import UserEntityModelBase from "../base/UserEntityModelBase.js";

import RegionsModel from "../references/RegionsModel.js";
import CitiesModel from "../references/CitiesModel.js";
import AgentsModel from "../user-entities/AgentsModel.js";
import InsuranceCompaniesModel from "../user-entities/AppraisalCompaniesModel.js";

const InsuredPersons = {
    name: 'insured_persons',
    itemName: 'insured_person',
    tableName: 'insured_persons',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        second_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING
        },
        city_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        region_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        agent_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        insurance_company_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        passport_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        login_id: {
            allowNull: false,
            type: DataTypes.STRING
        },
        sign_picture: {
            allowNull: true,
            type: DataTypes.TEXT
        }
    }
}

class InsuredPersonsModel extends UserEntityModelBase {
    // Only specific model methods here

    async _extend(item) {
        if (item && this.extend) {
            const insurance_company = await InsuranceCompaniesModel.findById(item.dataValues.insurance_company_id);
            //const agent = await AgentsModel.findById(item.dataValues.agent_id);
            //const region = await RegionsModel.findById(item.dataValues.region_id);
            //const city = await CitiesModel.findById(item.dataValues.city_id);

            item.dataValues.insurance_company = insurance_company;
            //item.dataValues.agent = agent;
            //item.dataValues.region = region;
            //item.dataValues.city = city;
        }
        return item;
    }

    async create(fields) {
        fields = this._preQueryCreate(fields);

        if (fields.city_id) {
            const city = await CitiesModel.findById(fields.city_id);
            fields.region_id = city.region_id;
        }

        const createdItem = await this.model.create(fields);
        return await this._extend(createdItem);
    }

    async update(id, fields) {
        fields = this._preQueryUpdate(fields);

        if (fields.city_id) {
            const city = await CitiesModel.findById(fields.city_id);
            fields.region_id = city.region_id;
        }

        await this.model.update(fields, { where: { id: id } });
        return await this.findById(id);
    }
}

const insuredPersonsModel = new InsuredPersonsModel(InsuredPersons);

export default insuredPersonsModel;