'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import UserEntityModelBase from "../base/UserEntityModelBase.js";

import RegionsModel from "../references/RegionsModel.js";
import CitiesModel from "../references/CitiesModel.js";

import QueryUtils from "../../utils/QueryUtils.js";

const SDP = {
    name: 'sdp',
    itemName: 'sdp',
    tableName: 'sdp',
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
        passport_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        region_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        city_id: {
            allowNull: true,
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
        },
        supplier_type_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class SDPModel extends UserEntityModelBase {
    // Only specific model methods here

    _mutateFields(fields) {
        const insurance_company_ids = fields.insurance_company_ids;
        if (insurance_company_ids) {
            if (!Array.isArray(insurance_company_ids)) {
                fields.insurance_company_ids = QueryUtils.fieldToArray(insurance_company_ids);
            }
        }
        const supplier_type_ids = fields.supplier_type_ids;
        if (supplier_type_ids) {
            if (!Array.isArray(supplier_type_ids)) {
                fields.supplier_type_ids = QueryUtils.fieldToArray(supplier_type_ids);
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
            if (query.supplier_type_id) {
                const supplier_type_id = query.supplier_type_id;
                return await this.model.findAll({
                    where: {
                        supplier_type_ids: {
                            [Op.contains]: [supplier_type_id]
                        }
                    }
                });
            } else {
                return await super.filter(query);
            }
        }
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

const sdpModel = new SDPModel(SDP);

export default sdpModel;