'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

import InsuredEventTypesModel from "./InsuredEventTypesModel.js";

const InsuredPropertyTypes = {
    name: 'insured_property_types',
    itemName: 'insured_property_type',
    tableName: 'insured_property_types',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        insured_property_type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        insured_event_type_ids: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        ru_description: {
            allowNull: true,
            type: DataTypes.STRING
        },
    }
}

class InsuredPropertyTypesModel extends ModelBase {
    // Only specific model methods here

    async findAll() {
        const insured_property_types = await super.findAll();

        // TODO: переделать на lodash
        for (let propertyType of insured_property_types) {
            let insuredEventTypeIds = propertyType.dataValues.insured_event_type_ids;

            const insured_event_types = await InsuredEventTypesModel.findByIds(insuredEventTypeIds);
            if (insured_event_types) {
                propertyType.dataValues.insured_event_types = insured_event_types;
            }
        }

        return insured_property_types;
    }

    async _extend(item) {
        if (item && this.extend) {
            const insuredEventTypeIds = item.dataValues.insured_event_type_ids;
            const insured_event_types = await InsuredEventTypesModel.findByIds(insuredEventTypeIds);
            if (insured_event_types) {
                item.dataValues.insured_event_types = insured_event_types;
            }
        }
        return item;
    }
}

const insuredPropertyTypesModel = new InsuredPropertyTypesModel(InsuredPropertyTypes);

export default insuredPropertyTypesModel;