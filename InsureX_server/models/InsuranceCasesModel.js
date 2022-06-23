'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../services/db/sequelizer.js";

import ModelBase from "./base/ModelBase.js";

import InsuredEventsModel from "./InsuredEventsModel.js";
import InsuredPersonsModel from "./user-entities/InsuredPersonsModel.js";
import AgentsModel from "./user-entities/AgentsModel.js";
import InsuredPropertyTypesModel from "./references/InsuredPropertyTypesModel.js";
import InsuredEventTypesModel from "./references/InsuredPropertyTypesModel.js";
import CitiesModel from "./references/CitiesModel.js";
import InsuranceCaseStatusesModel from "./references/InsuranceCaseStatusesModel.js";

import CarsModel from "./component-entities/CarsModel.js";
import DriversModel from "./component-entities/DriversModel.js";
import EstatesModel from "./component-entities/EstatesModel.js";
import BulgaryDetailsModel from "./component-entities/BulgaryDetailsModel.js";
import IncidentParticipantsModel from "./component-entities/IncidentParticipantsModel.js";
import LastUsersModel from "./component-entities/LastUsersModel.js";
import OthersModel from "./component-entities/OthersModel.js";
import PlacesModel from "./component-entities/PlacesModel.js";
import TheftTimeIntervalsModel from "./component-entities/TheftTimeIntervalsModel.js";
import ThirdPersonsModel from "./component-entities/ThirdPersonsModel.js";
import VictimsModel from "./component-entities/VictimsModel.js";
import WitnessesModel from "./component-entities/WitnessesModel.js";

const InsuranceCases = {
    name: 'insurance_cases',
    itemName: 'insurance_case',
    tableName: 'insurance_cases',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        insured_event_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        insured_person_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        property_type_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        event_type_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        agent_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        city_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        status_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        incident_date: {
            allowNull: true,
            type: DataTypes.DATE
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        details: {
            allowNull: true,
            type: DataTypes.STRING
        },
        document_date: {
            allowNull: true,
            type: DataTypes.DATE
        },
        insured_number: {
            allowNull: true,
            type: DataTypes.STRING
        },
        policy: {
            allowNull: true,
            type: DataTypes.STRING
        },
        claim_amount: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },
        whose_signature: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }
}

class InsuranceCasesModel extends ModelBase {
    // Only specific model methods here

    _getTypeHash(item) {
        const hashTypesTable = {
            "accident": { event_type_id: 1, property_type_id: 1},
            "car-bulgary": { event_type_id: 3, property_type_id: 1},
            "theft-car": { event_type_id: 5, property_type_id: 1},
            "nature-damage-home": { event_type_id: 9, property_type_id: 2},
            "nature-damage-office": { event_type_id: 9, property_type_id: 3},
            "water-damage-home": { event_type_id: 2, property_type_id: 2},
            "water-damage-office": { event_type_id: 2, property_type_id: 3},
            "fire-damage-home": { event_type_id: 4, property_type_id: 2},
            "fire-damage-office": { event_type_id: 4, property_type_id: 3},
            "bulgary-home": { event_type_id: 6, property_type_id: 2},
            "bulgary-office": { event_type_id: 6, property_type_id: 3},
            "person-3d-home": { event_type_id: 7, property_type_id: 2},
            "person-3d-office": { event_type_id: 7, property_type_id: 3},
            "other-home": { event_type_id: 8, property_type_id: 2},
            "other-office": { event_type_id: 8, property_type_id: 3}
        };

        function findTypeHash(event_type_id, property_type_id) {
            const keys = Object.keys(hashTypesTable);

            for (let key of keys) {
                if (hashTypesTable[key].event_type_id === event_type_id &&
                    hashTypesTable[key].property_type_id === property_type_id) {
                    return key;
                }
            }
            throw new Error(`Cannot find type hash: [${event_type_id}, ${property_type_id}]`);
        }

        const event_type_id = item.event_type_id;
        const property_type_id = item.property_type_id;

        return findTypeHash(event_type_id, property_type_id);
    }

    async _extend(item) {
        if (item && this.extend) {
            const insured_event = await InsuredEventsModel.findById(item.dataValues.insured_event_id);
            //const insured_person = await InsuredPersonsModel.findById(item.dataValues.insured_person_id);

            //const agent = await AgentsModel.findById(item.dataValues.agent_id);
            //const insured_property_type = await InsuredPropertyTypesModel.findById(item.dataValues.property_type_id);
            //const insured_event_type = await InsuredEventTypesModel.findById(item.dataValues.event_type_id);
            //const city = await CitiesModel.findById(item.dataValues.city_id);
            //const insurance_case_status = await InsuranceCaseStatusesModel.findById(item.dataValues.status_id);

            item.dataValues.insured_event = insured_event;
            //item.dataValues.insured_person = insured_person;
            //item.dataValues.insured_person = insured_event.dataValues.insured_person;

            //item.dataValues.agent = agent;
            //item.dataValues.insured_property_type = insured_property_type;
            //item.dataValues.insured_event_type = insured_event_type;
            //item.dataValues.city = city;
            //item.dataValues.status = insurance_case_status;

            /*
            const cars = await CarsModel.findItems(item.dataValues.id);
            const drivers = await DriversModel.findItems(item.dataValues.id);
            const estates = await EstatesModel.findItems(item.dataValues.id);
            const bulgary_details = await BulgaryDetailsModel.findItems(item.dataValues.id);
            const incident_participants = await IncidentParticipantsModel.findItems(item.dataValues.id);
            const last_users = await LastUsersModel.findItems(item.dataValues.id);
            const others = await OthersModel.findItems(item.dataValues.id);
            const places = await PlacesModel.findItems(item.dataValues.id);
            const theft_time_intervals = await TheftTimeIntervalsModel.findItems(item.dataValues.id);
            const third_persons = await ThirdPersonsModel.findItems(item.dataValues.id);
            const victims = await VictimsModel.findItems(item.dataValues.id);
            const witnesses = await WitnessesModel.findItems(item.dataValues.id);

            item.dataValues.cars = cars;
            item.dataValues.drivers = drivers;
            item.dataValues.estates = estates;
            item.dataValues.bulgary_details = bulgary_details;
            item.dataValues.incident_participants = incident_participants;
            item.dataValues.last_users = last_users;
            item.dataValues.others = others;
            item.dataValues.places = places;
            item.dataValues.theft_time_intervals = theft_time_intervals;
            item.dataValues.third_persons = third_persons;
            item.dataValues.victims = victims;
            item.dataValues.witnesses = witnesses;
            */

            //item.dataValues.type_hash = this._getTypeHash(item.dataValues);
        }

        return item;
    }

    /*
    async filter(query) {
        InsuredEventsModel.extend = false;
        InsuredPersonsModel.extend = false;
        AgentsModel.extend = false;
        InsuredPropertyTypesModel.extend = false;
        InsuredEventTypesModel.extend = false;
        CitiesModel.extend = false;
        InsuranceCaseStatusesModel.extend = false;

        CarsModel.extend = false;
        DriversModel.extend = false;
        EstatesModel.extend = false;
        IncidentParticipantsModel.extend = false;
        LastUsersModel.extend = false;
        OthersModel.extend = false;
        PlacesModel.extend = false;
        TheftTimeIntervalsModel.extend = false;
        ThirdPersonsModel.extend = false;
        VictimsModel.extend = false;
        WitnessesModel.extend = false;

        let items = await super.filter(query);
        for (let item of items) {
            item = await this._extend(item);
        }
        return items;
    }
    */
}

const insuranceCasesModel = new InsuranceCasesModel(InsuranceCases);

export default insuranceCasesModel;