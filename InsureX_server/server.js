'use strict';

import { Server } from "http";

import express from "express";

import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import HttpStatus from "http-status";

import cors from "cors";
import cookieParser from "cookie-parser";
//import cookieSession from "cookie-session";
import compression from "compression";

import morgan from "morgan";

import fs from "fs";
import rfs from "rotating-file-stream";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as url from "url";

import MultiParser from "./middleware/multiparser.js";

import ErrorUtils from "./utils/ErrorUtils.js";

import config from "./config.js";
import logger from "./services/Logger.js";

import routes from "./routers.js";

import Session from "express-session";
import Redis from "redis";
import ConnectRedis from "connect-redis";

import WebSocket from "ws";

import WebSocketIOServer from "./websockets/SocketIOSingleton.js";
import queryString from "query-string";

logger.info(`Starting ${config.serverConfiguration.name} web server...`);

const mainRouterRelativePath = config.API_RELATIVE_PATH;

// Print server configuration information
_printServerConfig();
_printRunningScripts();

// Create express service
let app = new express();

// Enable/disable CORS
_enableCORSIfNeeded(app);

// Warn about critical settings in server configuration
_warnAboutSettingsIfNeeded();

// Add middleware components and settings
_addMiddleware(app);

// Setup websockets WSS server
let wss;
if (config.websockets.wss.enabled) {
    wss = new WebSocket.Server({
        port: config.websockets.wss.port
        //noServer: true,
        //path: config.websockets.wss.path
    });

    app.use((req, res, next) => {
        req.wss = wss;
        next();
    });
}

// Setup session options
let sessionOptions = config.session.options;

let redisClient;

// Init Redis Store if needed
if (config.session.initRedisStore) {
    logger.info(`Connect to Redis store on ${config.redis.host}:${config.redis.port}...`);

    // Configure Redis client
    let RedisStore = new ConnectRedis(Session);
    redisClient = Redis.createClient({
            host: config.redis.host,
            port: config.redis.port
        }
    );

    redisClient.on('error', function(error) {
        logger.error(`Error starting Redis: ${error}`);
        logger.warn("Redis is not running: sessions won't be written to disk");
    });

    redisClient.on('ready', function() {
        logger.info("Redis server is ready");
    });

    redisClient.on('connect', function() {
        logger.info("Redis connected successfully");
    });

    // Initialize Redis session store
    sessionOptions.store = new RedisStore({
        client: redisClient
    });
}

// Use memory session store / Redis session store
const sessionMiddleware = Session(sessionOptions);
app.use(sessionMiddleware);

if (config.session.initRedisStore) {
    app.use((req, res, next) => {
        req.sessionID = req.headers.sessionid;
        req.sessionOptions = sessionOptions;
        next();
    });
}

// Init routers
_initRouters(app);

// Init Swagger UI support
_initSwaggerUISupport(app);

// Capture unknown endpoints
_initUnknownEndpointProcessing(app);

// Initialize errors handling
app.use(_handleErrors);
_capture404Errors(app);
_capture500Errors(app);

// Create http server
const httpServer = new Server(app);

// Configure WebSocket IO server as singleton
if (config.websockets.socketIO.enabled) {
    if (!config.session.initRedisStore) {
        logger.error("WebSocket IO server support not initialized because Redis store disabled");
    } else {
        WebSocketIOServer.configure(httpServer, sessionMiddleware, sessionOptions, redisClient);
        logger.info(`WebSocket IO server support initialized on "${config.websockets.socketIO.path}" route`);
    }
}

// Start http server
_startHttpServer();

// Configure WebSocket WSS server
if (config.websockets.wss.enabled) {
    httpServer.on("upgrade", (request, socket, head) => {
        const pathname = url.parse(request.url).pathname;
        if (pathname === config.websockets.wss.path) {
            wss.handleUpgrade(request, socket, head, (websocket) => {
                wss.emit("connection", websocket, request);
            });
        } else {
            socket.destroy();
        }
    });

    wss.on(
        "connection",
        function connection(websocketConnection, connectionRequest) {
            const [_path, params] = connectionRequest?.url?.split("?");
            const connectionParams = queryString.parse(params);

            // NOTE: connectParams are not used here but good to understand how to get
            // to them if you need to pass data with the connection to identify it (e.g., a userId).
            //console.log(_path);
            app.locals.clients = wss.clients;

            websocketConnection.on("message", (message) => {
                const parsedMessage = JSON.parse(message);
                //websocketConnection.send(JSON.stringify({ message: 'Response message' }));
            });
        }
    );

    logger.info(`WebSocket WSS server support initialized on "${config.websockets.wss.path}" route`);
}

/**
 * Start Http Server
 * @private
 */
function _startHttpServer() {
    httpServer.listen(config.server.port, () => {
        _printStartMessage();
    });
}

/**
 * Prints start message
 * @private
 */
function _printStartMessage() {
    const serverName = config.serverConfiguration.name;
    const serverVersion = config.serverConfiguration.version;
    logger.info(`Welcome to ${serverName} v.${serverVersion} web server! The server is started on ${config.server.host}:${config.server.port}`);
}

/**
 * Prints server config
 * @private
 */
function _printServerConfig() {
    logger.info(`API version: ${config.apiVersion}`);
    logger.debug(`Running environment: ${config.ENV}`);
    logger.debug(`Environment ${config.ENV} configuration: ${JSON.stringify(config.ENVConfig, null, 2)}`);
}

/**
 * Print list of running scripts
 * @private
 */
function _printRunningScripts() {
    const runningScripts = config.serverConfiguration.scripts;
    logger.info(`Running scripts: ${JSON.stringify(runningScripts, null, 2)}`);
}

/**
 * Enables CORS if needed
 * @param app
 * @private
 */
function _enableCORSIfNeeded(app) {
    /*
    app.use(cors({
        origin: config.baseUrl,
        credentials: config.enableCORS
    }));
    */
    app.use(cors());
}

/**
 * Displays errors when security-critical settings are enabled.
 * */
function _warnAboutSettingsIfNeeded() {
    const showWarnFunc = (boolTrigger, warningMessage) => (boolTrigger) ? logger.warn(warningMessage) : null;
    showWarnFunc(config.DEBUG, 'FORCE DEBUG mode ON');
    showWarnFunc(config.enableCORS, 'Cross-origin resource sharing enabled');
    showWarnFunc(config.disableRequestLimits, 'Request limits disabled');
    showWarnFunc(config.enableXPoweredBy, 'X-Powered-By enabled');
    showWarnFunc(!config.hashPasswords, 'Hash passwords disabled');
    showWarnFunc(config.includeStackTraceToErrors, 'Include stack trace to errors enabled');
    showWarnFunc(!config.session.initRedisStore, 'Redis store disabled');
    showWarnFunc(!config.websockets.socketIO.enabled, 'Websocket IO server disabled');
    showWarnFunc(!config.websockets.wss.enabled, 'Websocket WSS server disabled');
}

function _initMorganMiddleware(app) {
    // Create a console stream
    if (config.writeToConsole) {
        app.use(morgan('combined'));
    }

    // Create a rotating write stream
    const _dirname = dirname(fileURLToPath(import.meta.url));
    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: join(_dirname, 'logs')
    })
    app.use(morgan('combined', { stream: accessLogStream }));
}

/**
 * Register server middleware
 * @param app
 * @private
 */
function _addMiddleware(app) {
    /*
    NOTE: Don't change the middleware order unnecessarily!
    * */

    _initMorganMiddleware(app);

    // Enable this if you run behind a proxy (e.g. nginx)
    app.set('trust proxy', 1);

    if (!config.enableXPoweredBy) {
        app.disable('x-powered-by');
    }

    app.use(express.static("."));
    app.use('/', express.static('public'));

    app.use(compression());

    app.use(express.json());

    app.use(cookieParser());
    //app.use(cookieSession({secret: config.secretKey}));

    const bodyLimit = config.disableRequestLimits ? '100mb' : config.bodyLimit;

    app.use(bodyParser.text({
        type: 'application/json',
        limit: bodyLimit
    }));

    app.use(bodyParser.raw({
        inflate: true,
        type: 'application/json',
        limit: bodyLimit
    }));

    app.use(bodyParser.json({
        extended: true,
        type: 'application/json',
        limit: bodyLimit
    }));

    app.use(bodyParser.urlencoded({
        extended: true,
        limit: bodyLimit
    }));

    // Init body multi parser
    app.use(MultiParser);
}

/**
 * Routers initialization
 * @param app
 * @private
 */
function _initRouters(app) {
    app.use(mainRouterRelativePath, routes);
}

/**
 * Swagger support initialization
 * @param app
 * @private
 */
function _initSwaggerUISupport(app) {
    logger.info('Swagger support initialized on /api-doc route');
    const swaggerFile = JSON.parse(fs.readFileSync("./swagger/swagger-output.json"));
    app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

/**
 * Unknown endpoint processing
 * @param app
 * @private
 */
function _initUnknownEndpointProcessing(app) {
    app.get("*", (req, res) => {
        logger.error(`500 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).json({ error: true, message: "Unknown Endpoint. Use /api-doc to see available endpoints" });
    });
}

/**
 *
 * @param error
 * @param request
 * @param response
 * @param next
 * @returns {*}
 * @private
 */
function _handleErrors(error, request, response, next) {
    if (response.headersSent) {
        return next(error);
    }
    const errorObject = ErrorUtils.createInternalError(error);
    logger.error(errorObject.message);
    if (error.stack) {
        logger.debug(error.stack);
    }
    response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(errorObject)
        .end();
}

/**
 * Capture 500 errors
 * @param app
 * @private
 */
function _capture500Errors(app) {
    app.use((err, req, res, next) => {
        const status = err.status || 500;
        const message = err.message || "Something went wrong. Please try again later";
        logger.error(`${status} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(status).json({ error: true, message: message });
    });
}

// NOTE: 403 errors captures in role() middleware

/**
 * Capture 404 errors
 * @param app
 * @private
 */
function _capture404Errors(app) {
    app.use((req, res, next) => {
        logger.error(`404 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).json({ error: true, message: "Page not found" });
    });
}