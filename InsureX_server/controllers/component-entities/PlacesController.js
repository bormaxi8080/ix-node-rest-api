'use strict';

import InsuranceCaseEntityControllerBase from "../base/InsuranceCaseEntityControllerBase.js";

import PlacesModel from "../../models/component-entities/PlacesModel.js";
import InsuranceCasesModel from "../../models/InsuranceCasesModel.js";

class PlacesController extends InsuranceCaseEntityControllerBase {
    // Only specific controller methods here

    // In PlacesController object we cannot create new places
    // Use only appendInsuranceCase and removeInsuranceCase

    async appendInsuranceCase(req, res) {
        try {
            const id = req.params.id;
            const case_id = req.params.case_id;

            if (await InsuranceCasesModel.exists(case_id)) {
                if (this.model.exists(id)) {
                    const itemInInsuranceCase = await this._itemInInsuranceCase(id, case_id);
                    if (!itemInInsuranceCase) {
                        await this.model.appendInsuranceCase(id, case_id);
                    }
                    const item = await this.model.findById(id);
                    return await this._sendOne(item, res);
                } else {
                    return await this._sendError(404, `Item not found: ${id}`, res);
                }
            } else {
                return await this._sendError(404, `Item not found: ${case_id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async removeInsuranceCase(req, res) {
        try {
            const id = req.params.id;
            const case_id = req.params.case_id;

            if (await InsuranceCasesModel.exists(case_id)) {
                if (this.model.exists(id)) {
                    const itemInInsuranceCase = await this._itemInInsuranceCase(id, case_id);
                    if (itemInInsuranceCase) {
                        await this.model.removeInsuranceCase(id, case_id);
                    }
                    const item = await this.model.findById(id);
                    return await this._sendOne(item, res);
                } else {
                    return await this._sendError(404, `Item not found: ${id}`, res);
                }
            } else {
                return await this._sendError(404, `Item not found: ${case_id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }
}

const placesController = new PlacesController(PlacesModel);

export default placesController;