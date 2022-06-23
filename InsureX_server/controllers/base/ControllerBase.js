'use strict';

import logger from "../../services/Logger.js";

/* abstract */ class ControllerBase {
    async _sendMessage(message, res) {
        return await res.status(200).json({ error: false, message: message });
    }

    async _sendError(status, error, res) {
        logger.debug(`Response error: ${error}, status: ${status}`);
        return await res.status(status).json({ error: true, message: error });
    }

    async _sendInternalError(error, res) {
        logger.debug(`Response internal error: ${error}`);
        return await res.status(500).json({ error: true, message: { internal_server_error: {error} } });
    }
}

export default ControllerBase;