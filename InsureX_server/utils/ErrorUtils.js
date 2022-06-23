'use strict';

import _ from "lodash";
import Config from "../config.js";

const ERROR_CODES = {
    INTERNAL_ERROR: -500,
    AS_INTERNAL_ERROR: -501
};

class ErrorUtils {
    /**
     * @param {Object|Error|string}error
     * @returns {string}
     * */
    static createErrorMessage(error) {
        if (!error) {
            return 'Operation successful';
        }

        let message = '';
        if (_.isObject(error)) {
            if (error.message) {
                message = error.message;
                if (error.stack && Config.includeStackTraceToErrors) {
                    message += '\n' + error.stack;
                }
            } else {
                message = JSON.stringify(error);
            }
        } else if (typeof error === 'string') {
            message = error;
        } else {
            message = error.toString();
        }
        return message;
    }

    /**
     * @param {Object|Error|string}message
     * @returns {AppServerErrorResult}
     * */
    static createAppServerInternalError(message) {
        return this._createError(ERROR_CODES.AS_INTERNAL_ERROR, message.error);
    }

    /**
     * @param {Object|Error|string}message
     * @returns {AppServerErrorResult}
     * */
    static createInternalError(message) {
        return this._createError(ERROR_CODES.INTERNAL_ERROR, message);
    }

    /**
     * @param {number}errorCode
     * @param {Object|Error|string}message
     * @returns {AppServerErrorResult}
     * @private
     * */
    static _createError(errorCode, message) {
        return {
            error: true,
            code: errorCode,
            message: this.createErrorMessage(message)
        };
    }
}

export default ErrorUtils;