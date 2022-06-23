'use strict';

/*
NOTE: This service was added from the legacy code of the old API.
It is not recommended to use this service for a combat environment.
Use Sequelize as your main service to access API database.
You may use this pool package for import/export data and some experiments.
* */

import config from "../../config.js";
import logger from "../Logger.js";

import Escaper from "../Escaper.js";

import pkg from "pg";

const { Pool } = pkg;


class dbPool {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.escaper = new Escaper();
        this.pool = new Pool(this.config.database);
        this.logQueries = this.config.import.logQueries;
    }

    _logQueryStr(queryStr) {
        if (this.logQueries) {
            this.logger.debug(`DBQUERY > ${queryStr}`);
        }
    }

    getPool() {
        return this.pool;
    }

    async query(queryStr) {
        this._logQueryStr(queryStr);
        return await this.pool.query(queryStr);
    }

    async queryEscape(queryStr) {
        this._logQueryStr(queryStr);
        return await this.pool.query(this.escaper.escape(queryStr));
    }
}

const pool = new dbPool(config, logger);

export default pool;