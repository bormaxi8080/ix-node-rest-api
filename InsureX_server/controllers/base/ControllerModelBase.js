'use strict';

import ControllerBase from "../base/ControllerBase.js";

import logger from "../../services/Logger.js";

class ControllerModelBase extends ControllerBase {
    constructor(model) {
        super();
        this.model = model;
    }

    async _sendOne(req, res) {
        return await res.status(200).json({ error: false, message: { [this.model.itemName]: req} });
    }

    async _sendMany(req, res) {
        return await res.status(200).json({ error: false, message: { [this.model.name]: req} });
    }

    async findAll(req, res) {
        try {
            const items = await this.model.findAll();
            return await this._sendMany(items, res);
        } catch (error) {
            await this._sendInternalError(error, res);
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const item = await this.model.findById(id);

            if (item) {
                return await this._sendOne(item, res);
            } else {
                return await this._sendError(404, `Item not found: ${id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async exists(req, res) {
        try {
            const id = req.params.id;
            const itemExists = await this.model.exists(id);
            return await this._sendMessage( { item_exists: itemExists }, res);
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async filter(req, res) {
        try {
            const query = req.query;
            const items = await this.model.filter(query);
            if (items.length) {
                return await this._sendMany(items, res);
            } else {
                return await this._sendError(404, "Items not found", res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async create(req, res) {
        try {
            const fields = req.body;
            logger.debug(`{operation: "create", body: ${JSON.stringify(fields, null, 2)}}`);
            const createdItem = await this.model.create(fields);
            return await this._sendOne(createdItem, res);
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const fields = req.body;
            logger.debug(`{operation: "update", id: ${id}, body: ${JSON.stringify(fields, null, 2)}}`);
            const itemExists = await this.model.exists(id);
            if (itemExists) {
                const updatedItem = await this.model.update(id, fields);
                return await this._sendOne(updatedItem, res);
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
            logger.debug(`{operation: "delete", id: ${id}`);
            const itemExists = await this.model.exists(id);
            if (itemExists) {
                await this.model.delete(id);
                return await this._sendMessage( `Item deleted successfully: ${id}`, res);
            } else {
                return await this._sendError(404, `Item not found: ${id}`, res);
            }
        } catch (error) {
            return await this._sendInternalError(error, res);
        }
    }
}

export default ControllerModelBase;