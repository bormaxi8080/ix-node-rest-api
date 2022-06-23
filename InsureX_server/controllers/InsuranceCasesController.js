'use strict';

import ControllerModelBase from "./base/ControllerModelBase.js";

import InsuranceCasesModel from "../models/InsuranceCasesModel.js";
import InsuranceCaseStatusesModel from "../models/references/InsuranceCaseStatusesModel.js";

import InsuredPersonsModel from "../models/user-entities/InsuredPersonsModel.js";

import CarsModel from "../models/component-entities/CarsModel.js";
import DriversModel from "../models/component-entities/DriversModel.js";
import EstatesModel from "../models/component-entities/EstatesModel.js";
import BulgaryDetailsModel from "../models/component-entities/BulgaryDetailsModel.js";
import IncidentParticipantsModel from "../models/component-entities/IncidentParticipantsModel.js";
import LastUsersModel from "../models/component-entities/LastUsersModel.js";
import OthersModel from "../models/component-entities/OthersModel.js";
import PlacesModel from "../models/component-entities/PlacesModel.js";
import TheftTimeIntervalsModel from "../models/component-entities/TheftTimeIntervalsModel.js";
import ThirdPersonsModel from "../models/component-entities/ThirdPersonsModel.js";
import VictimsModel from "../models/component-entities/VictimsModel.js";
import WitnessesModel from "../models/component-entities/WitnessesModel.js";

import CitiesModel from "../models/references/CitiesModel.js";

import InsuredEventsController from "./insuredEventsController.js";
import InsuredEventsModel from "../models/InsuredEventsModel.js"

import config from "../config.js";
import logger from "../services/Logger.js";

import WebSocket from "ws";

const broadcast = (clients, message) => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

class InsuranceCasesController extends ControllerModelBase {
    // Only specific controller methods here

    async _sendStatusNotification(item, clients) {
        let result = false;
        if (config.websockets.wss.enabled) {
            const status_id = item.status_id;
            const status = await InsuranceCaseStatusesModel.findById(status_id);

            if (status) {
                if (status.dataValues.inbox_notification) {
                    // Generate status message if needed
                    const status_message = {
                        object: "insurance_case",
                        id: item.dataValues.id,
                        insured_person_id: item.dataValues.insured_person_id,
                        insured_event_id: item.dataValues.insured_event_id,
                        insured_number: item.dataValues.insured_number,
                        status_id: item.dataValues.status_id,
                        status: status.dataValues.description
                    };

                    // Emit websocket broadcast event
                    if (clients) {
                        broadcast(clients, JSON.stringify(status_message));
                        result = true;
                    }
                }
            }
        }

        return result;
    }

    async create(req, res) {
        try {
            let fields = req.body;
            logger.debug(`{object: "insurance_case", operation: "create", body: ${JSON.stringify(fields, null, 2)}}`);

            // Define additional req.body fields for insured_event
            if (!fields.insurance_company_id) {
                InsuredPersonsModel.extend = false;
                const insured_person = await InsuredPersonsModel.findById(fields.insured_person_id);
                InsuredPersonsModel.extend = true;
                req.body.insurance_company_id = insured_person.dataValues.insurance_company_id;
            }
            if (!fields.status_id) {
                req.body.status_id = 1;  // created
            }
            if (fields.city_id) {
                CitiesModel.extend = false;
                const city = await CitiesModel.findById(fields.city_id);
                CitiesModel.extend = true;
                req.body.region_id = city.dataValues.region_id;
            }
            if (fields.document_date) {
                req.body.date = fields.document_date;
            }

            // Create inherited insured_event
            //let createdInsuredEvent;
            InsuredEventsController.model.extend = false;
            const createdInsuredEvent = await InsuredEventsController._create(req);
            InsuredEventsController.model.extend = true;

            req.body.insured_event_id = createdInsuredEvent.dataValues.id;
            req.body.insured_number = createdInsuredEvent.dataValues.insured_event_number;
            fields = req.body;

            // Create insurance case object
            const createdInsuranceCase = await this.model.create(fields);

            // Send status notification if needed
            // await this._sendStatusNotification(createdInsuranceCase, req.app.locals.clients);

            return await this._sendOne(createdInsuranceCase, res);
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            let fields = req.body;
            logger.debug(`{object: "insurance_case", operation: "update", id: ${id}, body: ${JSON.stringify(fields, null, 2)}}`);

            this.model.extend = false;
            const insuranceCase = await this.model.findById(id);
            this.model.extend = true;

            if (insuranceCase !== null) {
                // Remember current status_id
                const status_id = insuranceCase.status_id;

                // Update insurance case
                const updatedInsuranceCase = await this.model.update(id, fields);

                // Send status notification if needed
                //if (status_id !== updatedInsuranceCase.status_id) {
                //    await this._sendStatusNotification(updatedInsuranceCase, req.app.locals.clients);
                //}

                return await this._sendOne(updatedInsuranceCase, res);
            } else {
                return await this._sendError(404, `Item not found: ${id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async uploadFiles(req, res) {
        try {
            const case_id = req.params.id;
            const files = req.files;

            logger.debug(`{object: "insurance_case", operation: "upload files", case_id: ${case_id}}`);

            this.model.extend = false;
            const insuranceCase = await InsuranceCasesModel.findById(case_id);
            this.model.extend = true;

            if (insuranceCase !== null) {
                const insured_event_id = insuranceCase.dataValues.insured_event_id;

                const insured_event = await InsuredEventsModel.findById(insured_event_id);
                const folder_google_drive_id = insured_event.dataValues.folder_google_drive_id;

                // Upload files to Google Drive
                await InsuredEventsController._appendInsuredEventFiles(insured_event_id, folder_google_drive_id, files);

                // Return updated insurance case
                const updatedInsuranceCase = await this.model.findById(case_id);
                return await this._sendOne(updatedInsuranceCase, res);
            } else {
                return await this._sendError(404, `Item not found: ${case_id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async deleteFiles(req, res) {
        try {
            const case_id = req.params.id;
            const fields = req.body;

            logger.debug(`{object: "insurance_case", operation: "delete files", case_id: ${case_id}}`);

            const exists = await this.model.exists(case_id);
            if (exists) {
                // Delete file from Google Drive if needed
                await InsuredEventsController._deleteInsuredEventFiles(fields.deleted_files);

                // Return updated insurance case
                const updatedInsuranceCase = await this.model.findById(case_id);
                return await this._sendOne(updatedInsuranceCase, res);
            } else {
                return await this._sendError(404, `Item not found: ${case_id}`, res);
            }
        }
        catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async status(req, res) {
        const id = req.params.id;

        if (config.websockets.wss.enabled) {
            const itemExists = await this.model.exists(id);
            if (itemExists) {
                const item = await this.model.findById(id);
                await this._sendStatusNotification(item, req.app.locals.clients);
                return await super.findById(req, res);
            } else {
                return await this._sendError(404, `Item not found: ${id}`, res);
            }
        } else {
            return super.findById(req, res);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            logger.debug(`{object: "insurance_case", operation: "delete", id: ${id}}`);

            const itemExists = await this.model.exists(id);
            if (itemExists) {
                const item = await this.model.findById(id);
                req.params.insured_event_id = item.dataValues.insured_event_id;

                // Delete inherited insured event
                await InsuredEventsController._delete(req);

                // Remove references to deleted insurance case
                await CarsModel.deleteInsuranceCase(id);
                await DriversModel.deleteInsuranceCase(id);
                await EstatesModel.deleteInsuranceCase(id);
                await BulgaryDetailsModel.deleteInsuranceCase(id);
                await IncidentParticipantsModel.deleteInsuranceCase(id);
                await LastUsersModel.deleteInsuranceCase(id);
                await OthersModel.deleteInsuranceCase(id);
                await PlacesModel.deleteInsuranceCase(id);
                await TheftTimeIntervalsModel.deleteInsuranceCase(id);
                await ThirdPersonsModel.deleteInsuranceCase(id);
                await VictimsModel.deleteInsuranceCase(id);
                await WitnessesModel.deleteInsuranceCase(id);

                // Delete insurance case
                await this.model.delete(id);
                return await this._sendMessage( `Item deleted successfully: ${id}`, res);
            } else {
                return await this._sendError(404, `Item not found: ${id}`, res);
            }
        } catch(error) {
            return await this._sendInternalError(error, res);
        }
    }
}

const insuranceCasesController = new InsuranceCasesController(InsuranceCasesModel);

export default insuranceCasesController;