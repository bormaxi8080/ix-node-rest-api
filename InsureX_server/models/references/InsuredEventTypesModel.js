'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

import InsuredPropertyTypesModel from "./InsuredPropertyTypesModel.js";

const InsuredEventTypes = {
    name: 'insured_event_types',
    itemName: 'insured_event_type',
    tableName: 'insured_event_types',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        insured_event_type: {
            allowNull: false,
            type: DataTypes.STRING
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

class InsuredEventTypesModel extends ModelBase {
    // Only specific model methods here

    async findAll() {
        const insured_event_types = await super.findAll();

        const insured_property_types = await InsuredPropertyTypesModel.findAll();

        // TODO: переделать на lodash
        for (let insuredEventType of insured_event_types) {
            let propertyTypeIds = [];

            // TODO: переделать на lodash
            for (let propertyType of insured_property_types) {
                if (propertyType.dataValues.insured_event_type_ids.indexOf(Number(insuredEventType.dataValues.id)) != -1) {
                    propertyTypeIds.push(propertyType.dataValues.id);
                }
            }

            if (propertyTypeIds.length) {
                const available_insured_property_types = await InsuredPropertyTypesModel.findByIds(propertyTypeIds);
                if (available_insured_property_types) {
                    insuredEventType.dataValues.available_insured_property_types = available_insured_property_types;
                }
            }
        }

        return insured_event_types;
    }

    async _extend(item) {
        if (item && this.extend) {
            let propertyTypeIds = [];

            const insured_property_types = await InsuredPropertyTypesModel.findAll();
            // TODO: переделать на lodash
            for (let propertyType of insured_property_types) {
                if (propertyType.dataValues.insured_event_type_ids.indexOf(Number(item.id)) != -1) {
                    propertyTypeIds.push(propertyType.dataValues.id);
                }
            }
            if (propertyTypeIds.length) {
                const available_insured_property_types = await InsuredPropertyTypesModel.findByIds(propertyTypeIds);
                if (available_insured_property_types) {
                    item.dataValues.available_insured_property_types = available_insured_property_types;
                }
            }
        }
        return item;
    }
}

const insuredEventTypesModel = new InsuredEventTypesModel(InsuredEventTypes);

export default insuredEventTypesModel;