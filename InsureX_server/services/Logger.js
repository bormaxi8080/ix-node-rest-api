'use strict';

import { createLogger, format, transports } from "winston";
import config from "../config.js";

const logLevel = (config.logger.level);
const colorize = (config.logger.colorize);

let writeToConsole = (config.writeToConsole);

const options = {
    file: {
        level: logLevel,
        filename: "./logs/server.log",
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: logLevel,
        handleExceptions: true,
        json: false,
        colorize: true,
    }
}

// Configure transports
const availableTransports = [];
if (writeToConsole) {
    availableTransports.push(new transports.Console(options.console));
}
availableTransports.push(new transports.File(options.file));

const logConfiguration = {
    exitOnError: false,
    transports: availableTransports,
    format: format.combine(
        format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        colorize ? format.colorize() : format.uncolorize(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    )
}

export default createLogger(logConfiguration);
