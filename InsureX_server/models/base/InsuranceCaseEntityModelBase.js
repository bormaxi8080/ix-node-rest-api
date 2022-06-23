'use strict';

import {Op, Sequelize} from "../../services/db/sequelizer.js";

import QueryUtils from "../../utils/QueryUtils.js";

import ModelBase from "../base/ModelBase.js";

class InsuranceCaseEntityModelBase extends ModelBase {
    // Only specific model methods here

    async _extend(item) {
        return await super._extend(item);
    }

    _mutateFields(fields) {
        let insurance_case_ids = fields.insurance_case_ids;
        if (insurance_case_ids) {
            if (!Array.isArray(insurance_case_ids)) {
                fields.insurance_case_ids = QueryUtils.fieldToArray(insurance_case_ids);
            }
        }
        return super._mutateFields(fields);
    }

    _preQueryCreate(fields) {
        fields = this._mutateFields(fields);
        return super._preQueryCreate(fields);
    }

    _preQueryUpdate(fields) {
        fields = this._mutateFields(fields);
        return super._preQueryUpdate(fields);
    }

    async findItems(case_id) {
        const where = {
            insurance_case_ids: {
                [Op.contains]: [case_id]
            }
        }

        return await this.model.findAll({
            where: where
        });
    }

    async findInInsuranceCase(case_id, id) {
        const where = {
            insurance_case_ids: {
                [Op.contains]: [case_id]
            }
        }
        if (id) {
            where.id = id;
        }

        return await this.model.findAll({
            where: where
        });
    }

    async itemInInsuranceCase(id, case_id) {
        const item = await this.model.findAll({
            where: {
                insurance_case_ids: {
                    [Op.contains]: [case_id]
                },
                id: id
            }
        });
        return (item.length > 0);
    }

    async appendInsuranceCase(id, case_id) {
        return await this.model.update(
            {insurance_case_ids: Sequelize.fn('array_append', Sequelize.col('insurance_case_ids'), case_id)},
            {where: {id: id}}
        );
    }

    async removeInsuranceCase(id, case_id) {
        return await this.model.update(
            {insurance_case_ids: Sequelize.fn('array_remove', Sequelize.col('insurance_case_ids'), case_id)},
            {where: {id: id}}
        );
    }

    async deleteInsuranceCase(case_id) {
        let items = await this.findItems(case_id);
        // TODO: переделать на lodash
        for (let item of items) {
            await this.model.update(
                {insurance_case_ids: Sequelize.fn('array_remove', Sequelize.col('insurance_case_ids'), case_id)},
                {where: item.dataValues.id}
            );
        }
    }
}

export default InsuranceCaseEntityModelBase;