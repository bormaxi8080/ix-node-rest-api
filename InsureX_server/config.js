'use strict';

import fs from "fs";

const ENV = process.env.NODE_ENV || "production";
const DEBUG = process.env.DEBUG || false;

const Config = {
    ENV: ENV,  // Setting environment
    DEBUG: DEBUG,
    API_RELATIVE_PATH: "/api",
    import: {
        logQueries: true,
        geography: false
    },
    "development": {
        server: {
            host: "localhost",
            port: 3002,
            baseUrl: "http://localhost"
        },
        database: {
            user: 'insurex',
            host: '54.211.135.79',
            database: 'InsureX',
            password: 'sO0vB7jM6zqO9h3vv',
            port: 5432
        },
        session: {
            initRedisStore: true,
            options: {
                cookie: {
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 * 24h
                    httpOnly: true
                },
                resave: false,
                saveUninitialized: false,
                secret: "Gt6XweahhhUWeaXXXxcC2"
            }
        },
        redis: {
            host: "localhost",
            port: 6379,
            secret: ""
        },
        websockets: {
            socketIO: {
                enabled: true,
                pingInterval: 10000,
                pingTimeout: 5000,
                connectTimeout: 10000,
                path: "/websockets"
            },
            wss: {
                enabled: false,
                port: 8080,
                path: "/wss"
            }
        },
        googleDrive: {
            clientId: "743519130603-eqve9mtljg37r0i4ps8o1msj41mo146j.apps.googleusercontent.com",
            clientSecret: "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",
            redirectURI: "https://developers.google.com/oauthplayground",
            refreshToken: "1//04-xvYjbXWfJPCgYIARAAGAQSNwF-L9Ir1Tfr4wsTmLI69nsImoRqRyLOM9Chja3jCoG-2gQcj5YZ7ulUXp1nFCaSNuGReL1Q-3g"
        },
        logger: {
            level: 'debug',
            writeToConsole: true,
            logQueries: false,
            colorize: true
        },
        apiVersion: '2.1.13',
        secretKey: "vA31e_xHn%4'mn",
        statementTimeout: 60 * 1000,
        transactionTimeout: 60 * 1000,
        hashPasswords: false,
        enableCORS: true,
        includeStackTraceToErrors: true,
        disableRequestLimits: true,
        bodyLimit: 10 * 1024 * 1024,
        enableXPoweredBy: false
    },
    "test": {
        server: {
            host: "44.200.246.161",
            port: 3002,
            baseUrl: "http://44.200.246.161"
        },
        database: {
            user: 'insurex',
            host: '54.211.135.79',
            database: 'InsureX',
            password: 'sO0vB7jM6zqO9h3vv',
            port: 5432,
            timeout: 60 * 1000
        },
        session: {
            initRedisStore: false,
            options: {
                cookie: {
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 * 24h
                    httpOnly: true
                },
                resave: false,
                saveUninitialized: false,
                secret: "Gt6XweahhhUWeaXXXxcC2"
            }
        },
        redis: {
            host: "44.200.246.161",
            port: 6379,
            secret: ""
        },
        websockets: {
            socketIO: {
                enabled: false,
                pingInterval: 10000,
                pingTimeout: 5000,
                connectTimeout: 10000,
                path: "/websockets"
            },
            wss: {
                enabled: false,
                port: 8080,
                path: "/wss"
            }
        },
        googleDrive: {
            clientId: "743519130603-eqve9mtljg37r0i4ps8o1msj41mo146j.apps.googleusercontent.com",
            clientSecret: "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",
            redirectURI: "https://developers.google.com/oauthplayground",
            refreshToken: "1//04-xvYjbXWfJPCgYIARAAGAQSNwF-L9Ir1Tfr4wsTmLI69nsImoRqRyLOM9Chja3jCoG-2gQcj5YZ7ulUXp1nFCaSNuGReL1Q-3g"
        },
        logger: {
            level: 'info',
            writeToConsole: true,
            logQueries: false,
            colorize: true
        },
        apiVersion: '2.1.13',
        secretKey: "vA31e_xHn%4'mn",
        statementTimeout: 60 * 1000,
        transactionTimeout: 60 * 1000,
        hashPasswords: false,
        enableCORS: true,
        includeStackTraceToErrors: true,
        disableRequestLimits: true,
        bodyLimit: 10 * 1024 * 1024,
        enableXPoweredBy: false
    },
    "production": {
        server: {
            host: "54.211.135.79",
            port: 68,
            baseUrl: "http://54.211.135.79"
        },
        database: {
            user: 'insurex',
            host: '54.211.135.79',
            database: 'InsureX',
            password: 'sO0vB7jM6zqO9h3vv',
            port: 5432
        },
        session: {
            initRedisStore: false,
            options: {
                cookie: {
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,  // 24h
                    httpOnly: true
                },
                resave: false,
                saveUninitialized: false,
                secret: "Gt6XweahhhUWeaXXXxcC2"
            }
        },
        redis: {
            host: "54.211.135.79",
            port: 6379,
            secret: ""
        },
        websockets: {
            socketIO: {
                enabled: false,
                pingInterval: 10000,
                pingTimeout: 5000,
                connectTimeout: 10000,
                path: "/websockets"
            },
            wss: {
                enabled: false,
                port: 8080,
                path: "/wss"
            }
        },
        googleDrive: {
            clientId: "1026897205134-o42r7hi89a30pr5dv1gslcm3254d0miv.apps.googleusercontent.com",
            clientSecret: "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",
            redirectURI: "https://developers.google.com/oauthplayground",
            refreshToken: "1//04iBt-AG3oy7XCgYIARAAGAQSNwF-L9IrH5xsvdVbAu3dJOtncS-RH3CYMN_97CO94QleCjAtgfVq-bVEGB8jvnqgzkbCAKAJoP4"
        },
        logger: {
            level: 'info',
            writeToConsole: false,
            logQueries: false,
            colorize: false
        },
        apiVersion: '2.1.3',
        secretKey: "vA31e_xHn%4'mn",
        statementTimeout: 60 * 1000,
        transactionTimeout: 60 * 1000,
        hashPasswords: false,
        enableCORS: true,
        includeStackTraceToErrors: false,
        disableRequestLimits: false,
        bodyLimit: 10 * 1024 * 1024,
        enableXPoweredBy: false
    }
}

// Environment config
const ENVConfig = Config[ENV];
if (DEBUG) { ENVConfig.logger.writeToConsole = true; }
Config.ENVConfig = ENVConfig;

// Redefine settings from ENV
Config.server = ENVConfig.server;
Config.database = ENVConfig.database;
Config.redis = ENVConfig.redis;
Config.websockets = ENVConfig.websockets;
Config.googleDrive = ENVConfig.googleDrive;
Config.session = ENVConfig.session;
Config.secretKey = ENVConfig.secretKey;
Config.statementTimeout = ENVConfig.statementTimeout;
Config.transactionTimeout = ENVConfig.transactionTimeout,
Config.hashPasswords = ENVConfig.hashPasswords;
Config.logger = ENVConfig.logger;
Config.writeToConsole = ENVConfig.logger.writeToConsole;
Config.apiVersion = ENVConfig.apiVersion;
Config.enableCORS = ENVConfig.enableCORS;
Config.bodyLimit = ENVConfig.bodyLimit;
Config.includeStackTraceToErrors = ENVConfig.includeStackTraceToErrors;
Config.disableRequestLimits = ENVConfig.disableRequestLimits;
Config.enableXPoweredBy = ENVConfig.enableXPoweredBy;

// Add computational fields
// Base url is used for auth redirects and enabling auth headers in CORS.
// Warning! Currently, base url should be set to HTTP scheme, as otherwise Google sends 'Missing parameter: scope' error.
// The HTTP address will be redirected to HTTPS by NginX.
Config.baseUrl = ENVConfig.baseUrl + ":" + ENVConfig.port;

// Import server configuration
const serverConfiguration = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
Config.serverConfiguration = serverConfiguration;

export default Config;