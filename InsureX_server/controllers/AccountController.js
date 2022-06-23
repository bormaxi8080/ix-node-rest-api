'use strict';

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UsersModel from "../models/user-entities/UsersModel.js"
import InsuredPersonsModel from "../models/user-entities/InsuredPersonsModel.js";
import AgentsModel from "../models/user-entities/AgentsModel.js";
import SDPModel from "../models/user-entities/SDPModel.js";
import AppraisersModel from "../models/user-entities/AppraisersModel.js";
import InsuranceCompaniesModel from "../models/user-entities/InsuranceCompaniesModel.js";

import RolesModel from "../models/references/RolesModel.js";

import config from "../config.js";
import logger from "../services/Logger.js";

const secretKey = config.secretKey;


const accountController = {
    _extendUser(user, userEntity) {
        user.dataValues.first_name = userEntity.dataValues.first_name;
        user.dataValues.last_name = userEntity.dataValues.second_name;
        user.dataValues.email = userEntity.dataValues.email;
        user.dataValues.phone = userEntity.dataValues.phone;
        return user.dataValues;
    },

    async _extend(user) {
        delete user.dataValues["password"];  // delete password field for not retry to client

        if (user.role === "insured_person") {
            const insured_person = await InsuredPersonsModel.findByUserId(user.id);
            if (insured_person) {
                user.dataValues.insured_person = insured_person;
                this._extendUser(user, insured_person);
            }
        }

        if (user.role === "agent") {
            const agent = await AgentsModel.findByUserId(user.id);
            if (agent) {
                user.dataValues.agent = agent;
                this._extendUser(user, agent);
            }
        }

        if (user.role === "sdp") {
            const sdp = await SDPModel.findByUserId(user.id);
            if (sdp) {
                user.dataValues.sdp = sdp;
                this._extendUser(user, sdp);
            }
        }

        if (user.role === "insurance_company") {
            const insurance_company = await InsuranceCompaniesModel.findByUserId(user.id);
            if (insurance_company) {
                user.dataValues.insurance_company = insurance_company;
                // NOTE: Do not extend user, because fields not agreed!
            }
        }

        // Appraisal company
        // NOTE: where is not registration and extend now

        if (user.role === "appraiser") {
            const appraiser = await AppraisersModel.findByUserId(user.id);
            if (appraiser) {
                user.dataValues.appraiser = appraiser;
            }
        }

        return user;
    },

    // Hash password
    _hashPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    },

    _generateUserData(user) {
        return {
            user_id: user.id,
            login: user.login,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone
        }
    },

    _initializeExpressSession(req, userData) {
        if (!req.session) {
            req.session = {};
        }
        req.session.user_id = userData.user_id;
        req.session.login = userData.login;
        req.session.role = userData.role;
        req.session.token = userData.token;
        req.session.first_name = userData.first_name;
        req.session.last_name = userData.last_name;
        req.session.email = userData.email
        req.session.phone = userData.phone;
        req.session.is_authorized = true;
        req.session.connected = false;
        req.session.save();
    },

    async registration(req, res) {
        try {
            let {role, username, password} = req.body;
            let login = username;

            if (!role) {
                return res.status(400).json({error: true, message: "User role not set"});
            }

            // Check role exists
            const roles = await RolesModel.filter({ name: role });
            if (roles.length === 0) {
                return res.status(400).json({error: true, message: "Unknown user role"});
            }

            // Mutate login and password for user role
            if (role === "insured_person") {
                login = req.body.passport_id;
                password = req.body.phone;
            }

            if (role === "agent") {
                login = req.body.passport_id;
                password = req.body.phone;
            }

            if (role === "sdp") {
                login = req.body.passport_id;
                password = req.body.phone;
            }

            if (role === "insurance_company") {
                login = req.body.title;
                password = req.body.phone;
            }

            if (role === "appraiser") {
                login = req.body.passport_id;
                password = req.body.phone;
            }

            if (!login || !password) {
                return res.status(400).json({error: true, message: "Login or password not set"});
            }

            // Check user exists
            const userExists = await UsersModel.userExists(login);
            if (userExists) {
                return res.status(404).json({error: true, message: "User already exists"});
            }

            // Create user
            let createdUser = await UsersModel.create({
                login: login,
                password: config.hashPasswords ? this._hashPassword(password) : password,
                role: role
            });

            const user = createdUser;
            let availableResponse = { user };
            delete availableResponse.user["password"];  // delete password field for not retry to client

            if (role === "insured_person") {
                /* req.body:
                    passport_id  = login
                    first_name,
                    second_name,
                    email,
                    phone = password,
                    address,
                    city_id,
                    insurance_company_id,
                    agent_id
                */

                const insuredPerson = req.body;
                insuredPerson.login_id = createdUser.login;
                insuredPerson.user_id = createdUser.id;

                const createdPerson = await InsuredPersonsModel.create(insuredPerson);
                if (createdPerson) {
                    availableResponse.insured_person = createdPerson;
                }
            }

            if (role === "agent") {
                /* req.body:
                    passport_id  = login
                    first_name,
                    second_name,
                    email,
                    phone = password,
                    address,
                    employee_number,
                    region_id,
                    insurance_company_ids  // not required
                */

                const agent = req.body;
                agent.login_id = createdUser.login;
                agent.user_id = createdUser.id;

                const createdAgent = await AgentsModel.create(agent);
                if (createdAgent) {
                    availableResponse.agent = createdAgent;
                }
            }

            if (role === "sdp") {
                /* req.body:
                    passport_id  = login
                    first_name,
                    second_name,
                    email,
                    phone = password,
                    address,
                    region_id,
                    insurance_company_ids,  // not required
                    supplier_type_ids       // not required
                */

                const sdp = req.body;
                sdp.login_id = createdUser.login;
                sdp.user_id = createdUser.id;

                const createdSDP = await SDPModel.create(sdp);
                if (createdSDP) {
                    availableResponse.sdp = createdSDP;
                }
            }

            if (role === "insurance_company") {
                /* req.body:
                    title  = login
                    email,
                    phone = password,
                    address,
                    email,
                    ie_number
                */

                const insurance_company = req.body;
                insurance_company.account_id = createdUser.login;
                insurance_company.user_id = createdUser.id;

                const createdInsuranceCompany = await InsuranceCompaniesModel.create(insurance_company);
                if (createdInsuranceCompany) {
                    availableResponse.insurance_company = createdInsuranceCompany;
                }
            }

            if (role === "appraiser") {
                /* req.body:
                    passport_id  = login
                    first_name,
                    second_name,
                    email,
                    phone = password,
                    region_id,
                    appraisal_company_id,
                    insurance_company_id
                */

                // Create Appraiser
                const appraiser = req.body;
                appraiser.login_id = createdUser.login;
                appraiser.user_id = createdUser.id;

                const createdAppraiser = await AppraisersModel.create(appraiser);
                if (createdAppraiser) {
                    availableResponse.appraiser = createdAppraiser;
                }
            }

            // Extend user data
            createdUser = await this._extend(createdUser);
            let userData = this._generateUserData(createdUser.dataValues);

            // Create user access token
            const token = jwt.sign(userData, secretKey);
            availableResponse.token = token;
            userData.token = token;

            // Initialize express session
            this._initializeExpressSession(req, userData);
            availableResponse.sessionID = req.session.id;
            availableResponse.session = req.session;

            logger.info(`New user registered: ${req.session.id} - ${JSON.stringify(req.session, null, 2)}`);
            return res.status(200).json({error: false, message: availableResponse});
        } catch (error) {
            logger.error(error);
            res.status(500).json({error: true, message: {internal_server_error: error}});
        }
    },

    async login(req, res) {
        try {
            const {username, password} = req.body;

            if (!username || !password) {
                return res.status(400).json({error: true, message: "Login or password not set"});
            }

            // Get user
            let user = await UsersModel.findByLogin(username);
            if (!user) {
                return res.status(404).json({error: true, message: "User not found"});
            }

            // Check password
            if (password !== user.password) {
                return res.status(403).json({error: true, message: "Incorrect password"});
            }

            // Extend user data
            user = await this._extend(user);
            let userData = this._generateUserData(user.dataValues);

            // Create user access token
            const token = jwt.sign(userData, secretKey);
            userData.token = token;

            // Initialize express session
            this._initializeExpressSession(req, userData);

            logger.info(`Login user: ${req.session.id} - ${JSON.stringify(req.session, null,2)}`);
            return res.status(200).json({error: false, message: {
                    user: user,
                    token: token,
                    sessionID: req.session.id,
                    session: req.session
                }
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({error: true, message: {internal_server_error: error}});
        }
    },

    async logout(req, res) {
        try {
            if (config.session.initRedisStore) {
                const sessionID = req.sessionID;
                if (sessionID) {
                    logger.debug(`Logout user: ${sessionID}`);
                    // Destroy user session
                    req.sessionOptions.store.destroy(sessionID, (error) => {
                        if (error) {
                            res.status(500).json({error: true, message: {internal_server_error: error}});
                        }
                        return res.status(200).json({error: false, message: "Logout successful"});
                    });
                } else {
                    return res.status(404).json({error: true, message: "Session not found"});
                }
            } else {
                res.status(500).json({error: true, message: "Redis store disabled"});
            }
        } catch(error) {
            logger.error(error);
            res.status(500).json({error: true, message: {internal_server_error: error}});
        }
    },

    async getSession(req, res) {
        try {
            if (config.session.initRedisStore) {
                const sessionID = req.sessionID;
                if (sessionID) {
                    req.sessionOptions.store.get(req.sessionID, (error, session) => {
                        if (error) {
                            res.status(500).json({error: true, message: {internal_server_error: error}});
                        }
                        if (session) {
                            return res.status(200).json({error: false, message: {sessionID: req.sessionID, session: session}});
                        } else {
                            return res.status(404).json({error: true, message: "Session not found"});
                        }
                    });
                } else {
                    return res.status(404).json({error: true, message: "Session not found"});
                }
            } else {
                res.status(500).json({error: true, message: "Redis store disabled"});
            }
        } catch(error) {
            logger.error(error);
            res.status(500).json({error: true, message: {internal_server_error: error}});
        }
    },

    async get(req, res) {
        try {
            if (config.session.initRedisStore) {
                const sessionID = req.sessionID;
                if (sessionID) {
                    req.sessionOptions.store.get(req.sessionID, (error, session) => {
                        if (error) {
                            res.status(500).json({error: true, message: {internal_server_error: error}});
                        }
                        if (session) {
                            const user = {
                                user_id: session.user_id,
                                login: session.login,
                                role: session.role,
                                token: session.token,
                                first_name: session.first_name,
                                last_name: session.last_name,
                                email: session.email,
                                phone: session.phone
                            };
                            return res.status(200).json({error: false, message: {sessionID: req.sessionID, session: session, user: user}});
                        } else {
                            return res.status(404).json({error: true, message: "Session not found"});
                        }
                    });
                } else {
                    return res.status(404).json({error: true, message: "Session not found"});
                }
            } else {
                res.status(500).json({error: true, message: "Redis store disabled"});
            }
        } catch(error) {
            logger.error(error);
            res.status(500).json({error: true, message: {internal_server_error: error}});
        }
    },

    async getByToken(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            const verifiedUser = jwt.verify(token, secretKey);
            let user = await UsersModel.findById(verifiedUser.id);

            // In this context, check if user exists in database
            if (!user) {
                return res.status(404).json({error: true, message: "User not found"});
            }

            // Extend user data
            user = this._extend(user);

            return res.status(200).json({error: false, message: {user}});
        } catch (error) {
            logger.error(error);
            res.status(500).json({error: true, message: {internal_server_error: error}});
        }
    }
}

export default accountController;