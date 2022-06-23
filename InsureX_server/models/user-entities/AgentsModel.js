'use strict';

import {DataTypes, Op} from "../../services/db/sequelizer.js";

import UserEntityModelBase from "../base/UserEntityModelBase.js";

import RegionsModel from "../references/RegionsModel.js";
import QueryUtils from "../../utils/QueryUtils.js";

const Agents = {
    name: 'agents',
    itemName: 'agent',
    tableName: 'agents',
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
        employee_number: {
            allowNull: true,
            type: DataTypes.STRING
        },
        passport_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        region_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        login_id: {
            allowNull: false,
            type: DataTypes.STRING
        },
        insurance_company_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class AgentsModel extends UserEntityModelBase {
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

const agentsModel = new AgentsModel(Agents);

export default agentsModel;