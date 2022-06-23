'use strict';

import _ from "lodash";
import jwt from "jsonwebtoken";

import config from "../config.js";

function checkRole(roles, token, res) {
    // Check user is auth
    if (!token) {
        return res.status(403).json({error: true, message: "User not auth"});
    }

    // NOTE: in this middleware do not refactor it!
    const verifiedUser = jwt.verify(token, config.secretKey);

    /* NOTE: jwt.verify generates HTTP 500 automatically if token is invalid or expired
    You don't need process this error here
     */

    /*
    NOTE: You don't need select user data from database here!
    In this context, this is a pointless operation that increases the load on the server.
     */

    // Check user access from role
    if (!roles.includes(verifiedUser.role) && roles.length) {
        return res.status(403).json({error: true, message: "Access denied"});
    }

    // Transfer user auth information from middleware to next routers
    res.locals.AUTH = {
        authenticated: true,
        user: verifiedUser
    }
}

export default (roles) => (req, res, next) => {
    if(!_.isNull(roles)) {  // if roles is null, not auth
        let token;
        if (config.session.initRedisStore && req.sessionID) {
            req.sessionOptions.store.get(req.sessionID, (error, session) => {
                if (error) {
                    res.status(500).json({error: true, message: {internal_server_error: error}});
                }
                if (session) {
                    if (session.is_authorized) {
                        token = session.token;
                        checkRole(roles, token, res);
                        next();
                    } else {
                        return res.status(403).json({error: true, message: "User not auth"});
                    }
                } else {
                    return res.status(403).json({error: true, message: "Session not found"});
                }
            });
        } else {
            token = req.headers.authorization?.split(" ")[1];
            checkRole(roles, token, res);
            next();
        }
    } else {
        res.locals.AUTH = { authenticated: false };
        next();
    }
}