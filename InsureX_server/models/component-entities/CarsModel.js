'use strict';

import {DataTypes} from "../../services/db/sequelizer.js";

import InsuranceCaseEntityModelBase from "../base/InsuranceCaseEntityModelBase.js";
import AutomobileTypesModel from "../references/AutomobileTypesModel.js";

const Cars = {
    name: 'cars',
    itemName: 'car',
    tableName: 'cars',
    fields: {
        /*
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },*/
        number: {
            allowNull: false,
            type: DataTypes.STRING
        },
        model: {
            allowNull: false,
            type: DataTypes.STRING
        },
        year: {
            allowNull: true,
            type: DataTypes.STRING
        },
        automobile_type_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        seller: {
            allowNull: true,
            type: DataTypes.STRING
        },
        price: {
            allowNull: true,
            type: DataTypes.STRING
        },
        security_equipment: {
            allowNull: true,
            type: DataTypes.STRING
        },
        info_if_equip_dont_set_owner: {
            allowNull: true,
            type: DataTypes.STRING
        },
        key_count: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        has_audio_system: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        model_and_price_audio_system: {
            allowNull: true,
            type: DataTypes.STRING
        },
        reason_if_car_not_registered: {
            allowNull: true,
            type: DataTypes.STRING
        },
        damage_picture: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        insurance_case_ids: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        }
    }
}

class CarsModel extends InsuranceCaseEntityModelBase {
    // Only specific model methods here

    /*
    async _extend(item) {
        if (item && this.extend) {
            const automobile_type_id = item.dataValues.automobile_type_id;
            if (automobile_type_id) {
                item.dataValues.automobile_type = await AutomobileTypesModel.findById(automobile_type_id);
            }
        }
        return item;
    }
    */
}

const carsModel = new CarsModel(Cars);

export default carsModel;