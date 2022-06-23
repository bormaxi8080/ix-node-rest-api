'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import UserEntityModelBase from "../base/UserEntityModelBase.js";
import QueryUtils from "../../utils/QueryUtils.js";

import RegionsModel from "../references/RegionsModel.js";
import CitiesModel from "../references/CitiesModel.js";

const AppraisalCompanies = {
    name: 'appraisal_companies',
    itemName: 'appraisal_company',
    tableName: 'appraisal_companies',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        appraisal_company_name: {
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
        office_address: {
            allowNull: false,
            type: DataTypes.STRING
        },
        city_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        region_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        insurance_company_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
        /*
        // Deprecated
        oao_ie_number: {
            allowNull: false,
            type: DataTypes.INTEGER
        }*/
    }
}

class AppraisalCompaniesModel extends UserEntityModelBase {
    // Only specific model methods here

    _mutateFields(fields) {
        const insurance_company_ids = fields.insurance_company_ids;
        if (insurance_company_ids) {
            if (!Array.isArray(insurance_company_ids)) {
                fields.insurance_company_ids = QueryUtils.fieldToArray(insurance_company_ids);
            }
        }
        return super._mutateFields(fields);
    }

    /*
    async _extend(item) {
        if (item && this.extend) {
            item.dataValues.region = await RegionsModel.findById(item.dataValues.region_id);
            item.dataValues.city = await CitiesModel.findById(item.dataValues.city_id);
        }
        return item;
    }
    */

    async filter(query) {
        if (query.insurance_company_id) {
            const insurance_company_id = query.insurance_company_id;
            return await this.model.findAll({
                where: {
                    insurance_company_ids: {
                        [Op.contains]: [insurance_company_id]
                    }
                }
            });
        } else {
            return await super.filter(query);
        }
    }
}

const appraisalCompaniesModel = new AppraisalCompaniesModel(AppraisalCompanies);

export default appraisalCompaniesModel;