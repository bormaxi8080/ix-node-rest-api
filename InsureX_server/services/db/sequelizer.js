'use strict';

import { Sequelize, Op, Model, DataTypes } from 'sequelize';

import config from "../../config.js";
import logger from "../Logger.js";

class Sequelizer {
    constructor() {
        this.config = config;
        this.logger = logger;

        this.database = this.config.database.database;
        this.user = this.config.database.user;
        this.password = this.config.database.password;
        this.host = this.config.database.host;
        this.port = this.config.database.port;

        this.sequelize = this.getSequelize();
    }

    getSequelize() {
        return new Sequelize(this.database, this.user, this.password, {
            host: this.host,
            port: this.port,
            dialect: "postgres",
            logging: this.config.logger.logQueries,
            define: {},
            dialectOptions: {
                statement_timeout: config.statementTimeout,
                idle_in_transaction_session_timeout: config.transactionTimeout
            },
            pool: {
                max: 100,
                min: 0,
                acquire: 60000,
                idle: 80000,
            }
        });
    }

    defineModel(sequelize, modelName, model, attributes) {
        return sequelize.define(modelName, model, attributes);
    }

    models() {
        return this.sequelize.models;
    }
}

let sequelizer = new Sequelizer();

export {
    sequelizer,
    Sequelize,
    Op,
    Model,
    DataTypes
}

