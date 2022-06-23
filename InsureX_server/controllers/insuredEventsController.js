'use strict';

import {v4 as uuidv4} from 'uuid';

import ControllerModelBase from "./base/ControllerModelBase.js";

import InsuredEventsModel from "../models/InsuredEventsModel.js";
import InsuredEventsFilesModel from "../models/InsuredEventsFilesModel.js";
import InsuredPersonsModel from "../models/user-entities/InsuredPersonsModel.js";
import AppraisalCompaniesModel from "../models/user-entities/AppraisalCompaniesModel.js";

import googleAPI from "../services/GoogleDrive.js";
import logger from "../services/Logger.js";
import InsuranceCasesModel from "../models/InsuranceCasesModel.js";
import CitiesModel from "../models/references/CitiesModel.js";

function _formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + mm + yy;
}


class InsuredEventsController extends ControllerModelBase {
    // Only specific controller methods here

    async _appendInsuredEventFiles(insuredEventId, folderId, files) {
        // TODO: переделать на lodash
        for (let file of Object.values(files)) {
            const { link, id: fileId } = await googleAPI.uploadFile(folderId, file);
            const insured_event_file = {
                insured_event_id: insuredEventId,
                link: link,
                file_google_drive_id: fileId,
                file_type: file.mimetype,
                file_name: file.originalFilename
            };
            await InsuredEventsFilesModel.create(insured_event_file);
        }
    }

    async _deleteInsuredEventFiles(deleted_files) {
        if (deleted_files) {
            // TODO: переделать на lodash
            for (let deletedFile of JSON.parse(deleted_files)) {
                await googleAPI.deleteFile(deletedFile.file_google_drive_id);
                await InsuredEventsFilesModel.deleteFile(deletedFile.file_google_drive_id);
            }
        }
    }

    async _create(req) {
        const fields = req.body;
        logger.debug(`{object: "insured_event", operation: "create", body: ${JSON.stringify(fields, null, 2)}}`);

        const insured_person_id = fields.insured_person_id;
        const insured_person = await InsuredPersonsModel.findById(insured_person_id);

        // Generate insured event number from passport_id+date
        // Passport_id format is XXX-XXXXXX
        const dt = _formatDate(new Date(fields.date));
        fields.insured_event_number = `${insured_person.dataValues.passport_id}-${dt}`;

        // Create Google Drive folder
        const folderGoogleDriveName = uuidv4();
        const { link, id: folderId } = await googleAPI.createFolder(folderGoogleDriveName);
        fields.folder_google_drive_name = folderGoogleDriveName;
        fields.folder_google_drive_id = folderId;
        fields.folder_google_drive_link = link;

        // Setup appraisal company
        if (!fields.appraisal_company_id) {
            const appraisal_companies = await AppraisalCompaniesModel.findAll();
            const region_appraisal_companies = await AppraisalCompaniesModel.filter({region_id: insured_person.dataValues.region_id});
            fields.appraisal_company_id = region_appraisal_companies.length ?
                region_appraisal_companies[Math.floor(Math.random() * region_appraisal_companies.length)].id
                :
                appraisal_companies[[Math.floor(Math.random() * appraisal_companies.length)]].id;
        }

        // Create and return insured event
        return await this.model.create(fields);
    }

    // DEPRECATED
    async create(req, res) {
        try {
            const createdItem = await this._create(req);
            return await this._sendOne(createdItem, res);
        } catch(error) {
            return await this._sendInternalError(error, res);
        }
    }

    async _update(req, res) {
        const case_id = req.params.id;
        const fields = req.body;

        logger.debug(`{object: "insured_event", operation: "update", case_id: ${case_id}, body: ${JSON.stringify(fields, null, 2)}}`);

        InsuranceCasesModel.extend = false;
        const insuranceCase = await InsuranceCasesModel.findById(case_id);
        InsuranceCasesModel.extend = true;

        if (insuranceCase !== null) {
            const insured_event_id = insuranceCase.dataValues.insured_event_id;

            if (fields.city_id) {
                CitiesModel.extend = false;
                const city = await CitiesModel.findById(fields.city_id);
                CitiesModel.extend = true;
                fields.region_id = city.dataValues.region_id;
            }

            if (fields.document_date) {
                fields.date = fields.document_date;
            }

            if (fields.date) {
                const insured_event = await this.model.findById(insured_event_id);

                InsuredPersonsModel.extend = false;
                const insured_person_id = insured_event.dataValues.insured_person_id;
                const insured_person = await InsuredPersonsModel.findById(insured_person_id);
                InsuredPersonsModel.extend = true;

                const dt = _formatDate(new Date(fields.date));
                fields.insured_event_number = `${insured_person.dataValues.passport_id}-${dt}`;
            }

            // Update insured event
            return await this.model.update(insured_event_id, fields);
        } else {
            return await this._sendError(404, `Item not found: ${case_id}`, res);
        }
    }

    // DEPRECATED
    async update(req, res) {
        try {
            const insured_event_id = req.params.id;
            req.params.insured_event_id = insured_event_id;

            const itemExists = await this.model.exists(insured_event_id);
            if (itemExists) {
                const updatedItem = await this._update(req);
                return await this._sendOne(updatedItem, res);
            } else {
                return await this._sendError(404, `Item not found: ${insured_event_id}`, res);
            }
        } catch(error) {
            return await this._sendInternalError(error, res);
        }
    }

    async _delete(req) {
        const insured_event_id = req.params.insured_event_id;
        logger.debug(`{object: "insurance_case", operation: "delete", id: ${insured_event_id}}`);

        const insured_event = await this.model.findById(insured_event_id);

        // Delete files from Google Drive
        const insured_event_files = await InsuredEventsFilesModel.findByInsuredEventId(insured_event_id);
        if (insured_event_files.length) {
            // TODO: переделать на lodash
            for (let deletedFile of JSON.parse(insured_event_files)) {
                await googleAPI.deleteFile(deletedFile.file_google_drive_id);
            }
        }

        // Delete Google Drive folder
        await googleAPI.deleteFolder(insured_event.dataValues.folder_google_drive_id);

        // Delete insured event files
        await InsuredEventsFilesModel.deleteByInsuredEventId(insured_event_id);

        // Delete insured event
        await this.model.delete(insured_event_id);
    }

    // DEPRECATED
    async delete(req, res) {
        try {
            const insured_event_id = req.params.id;
            req.params.insured_event_id = insured_event_id;

            const itemExists = await this.model.exists(insured_event_id);
            if (itemExists) {
                await this._delete(req);
                return await this._sendMessage( `Item deleted successfully: ${insured_event_id}`, res);
            } else {
                return await this._sendError(404, `Item not found: ${insured_event_id}`, res);
            }
        } catch(error) {
            return await this._sendInternalError(error, res);
        }
    }
}

const insuredEventsController = new InsuredEventsController(InsuredEventsModel);

export default insuredEventsController;