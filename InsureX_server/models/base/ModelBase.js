'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";


/**
 * Base class for all models
 */
class ModelBase {
    constructor(model) {
        this.name = model.name;
        this.itemName = model.itemName;
        this.tableName = model.tableName;
        this.fields = model.fields;
        this.attributes = {
            timestamps: false,
            underscored: true,
            tableName: model.tableName
        };
        this.sequelizer = sequelizer;
        this.extend = true;

        this.model = this.sequelizer.defineModel(
            this.sequelizer.sequelize,
            model.name,
            this.fields,
            this.attributes);

        //this.sequelizer.sequelize.authenticate().then(function(errors) { console.log(errors) });
    }

    _mutateFields(fields) {
        return fields;
    }

    _preQueryCreate(fields) {
        return fields;
    }

    _preQueryUpdate(fields) {
        return fields;
    }

    async _extend(item) {
        return await item;
    }

    async findAll() {
        return await this.model.findAll();
    }

    async findById(id) {
        const item = await this.model.findByPk(id);
        return await this._extend(item);
    }

    async findByIds(ids) {
        return await this.model.findAll({
            where: { id :{
                [Op.in]: ids
            } }
        });
    }

    async exists(id) {
        const count = await this.model.count({ where: {id: id} });
        return count > 0 ? true : false;
    }

    async filter(fields) {
        return await this.model.findAll({ where: fields });
    }

    async create(fields) {
        fields = this._preQueryCreate(fields);
        const createdItem = await this.model.create(fields);
        return await this._extend(createdItem);
    }

    async update(id, fields) {
        fields = this._preQueryUpdate(fields);
        await this.model.update(fields, {where: {id: id}});
        return await this.findById(id);
    }

    async delete(id) {
        await this.model.destroy({ where: { id: id } });
        return id;
    }
}

export default ModelBase;
