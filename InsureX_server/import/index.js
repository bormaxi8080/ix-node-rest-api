'use strict';

import insurexImport from "./insurexImport.js";

import config from "../config.js";
import logger from "../services/Logger.js";

const ENV = config.ENV;

// Get import settings
const importSettings = config.import;

insurexImport(/*options*/)(importSettings).then(async ({success, data}) => {
    logger.info(`Processing InsureX data import with settings: ${JSON.stringify(importSettings, null, 2)}`);
    logger.info(`Working environment: ${ENV}`);
    logger.debug(`Import results: ${JSON.stringify(data, null, 2)}`);
    logger.info(`Process data import: ${success}`);
})


