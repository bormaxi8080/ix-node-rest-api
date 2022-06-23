'use strict';

import ControllerModelBase from "./ControllerModelBase.js";

import InsuranceCasesModel from "../../models/InsuranceCasesModel.js";
import logger from "../../services/Logger.js";

class InsuranceCaseEntityControllerBase extends ControllerModelBase {
    // Only specific controller methods here

    async _itemInInsuranceCase(id, case_id) {
        return await this.model.itemInInsuranceCase(id, case_id);
    }

    async findInInsuranceCase(req, res) {
        try {
            const case_id = req.params.case_id;
            const id = req.params.id;

            if (await InsuranceCasesModel.exists(case_id)) {
                const items = await this.model.findInInsuranceCase(case_id, id);
                if (id) {
                    if (items.length === 0) {
                        return await this._sendError(404, `Item not found: ${id}`, res);
                    }
                }
                return await this._sendMany(items, res);
            } else {
                return await this._sendError(404, `Item not found: ${case_id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async create(req, res) {
        try {
            const case_id = req.params.case_id;
            const fields = req.body;
            logger.debug(`{operation: "create", case_id: ${case_id}, body: ${JSON.stringify(fields, null, 2)}}`);

            // Create entity
            let item = await this.model.create(fields);
            const item_id = item.dataValues.id;

            // Append insurance case in insurance case context
            if (case_id) {
                if (await InsuranceCasesModel.exists(case_id)) {
                    await this.model.appendInsuranceCase(item_id, case_id);
                } else {
                    return await this._sendError(404, `Item not found: ${case_id}`, res);
                }
            }

            item = await this.model.findById(item_id);
            return await super._sendOne(item, res);
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const case_id = req.params.case_id;
            const fields = req.body;
            logger.debug(`{operation: "update", id: ${id}, case_id: ${case_id}, body: ${JSON.stringify(fields, null, 2)}}`);

            const itemExists = await this.model.exists(id);
            if (itemExists) {

                // Update entity
                let item = await this.model.update(id, fields);

                // Append insurance case in insurance case context
                if (case_id) {
                    if (await InsuranceCasesModel.exists(case_id)) {
                        const itemInInsuranceCase = await this._itemInInsuranceCase(id, case_id);
                        if (!itemInInsuranceCase) {
                            await this.model.appendInsuranceCase(id, case_id);
                            item = await this.model.findById(id);
                        }
                    } else {
                        return await this._sendError(404, `Item not found: ${case_id}`, res);
                    }
                }

                return await super._sendOne(item, res);
            } else {
                return await this._sendError(404, `Item not found: ${id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const case_id = req.params.case_id;
            logger.debug(`{operation: "delete", case_id: ${case_id}}`);

            const itemExists = await this.model.exists(id);
            if (itemExists) {
                if (case_id) {
                    if (await InsuranceCasesModel.exists(case_id)) {
                        const itemInInsuranceCase = await this._itemInInsuranceCase(id, case_id);
                        if (itemInInsuranceCase) {
                            await this.model.removeInsuranceCase(id, case_id);
                        }
                        const item = await this.model.findById(id);
                        return await super._sendOne(item, res);
                    } else {
                        return await this._sendError(404, `Item not found: ${case_id}`, res);
                    }
                } else {
                    return await super.delete(req, res);
                }
            } else {
                return await this._sendError(404, `Item not found: ${id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }
}

export default InsuranceCaseEntityControllerBase;