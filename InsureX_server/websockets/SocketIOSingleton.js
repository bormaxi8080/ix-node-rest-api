'use strict';

import { Server } from "socket.io";

import { createAdapter } from "@socket.io/redis-adapter";

import { RedisSessionStore } from "../services/sessions/SessionStore.js";
import { RedisMessageStore } from "../services/sessions/MessageStore.js";

import config from "../config.js";
import logger from "../services/Logger.js";

class SocketIOSingleton {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.io = null;
    }

    configure(httpServer, sessionMiddleware, sessionOptions, redisClient) {
        const pubClient = redisClient;
        const subClient = pubClient.duplicate();

        this.io = new Server(httpServer, {
            pingInterval: config.websockets.socketIO.pingInterval,
            pingTimeout: config.websockets.socketIO.pingTimeout,
            connectTimeout: config.websockets.socketIO.connectTimeout,
            cors: { origin: '*' }
            //path: this.config.websockets.socketIO.path
        });

        // Convert a connect middleware to a Socket.IO middleware
        const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
        this.io.use(wrap(sessionMiddleware));

        this.io.adapter(createAdapter(pubClient, subClient));

        const sessionStore = new RedisSessionStore(redisClient);
        const messageStore = new RedisMessageStore(redisClient);

        // Only allow authenticated users
        this.io.use(async (socket, next) => {
            //const sessionID = socket.handshake.auth.sessionID;
            const sessionID = "1bI13n3Axoenx7zPGYzRVq3gzwKcRIKm";

            //console.log(socket);
            console.log(sessionID);

            if (sessionID) {
                //const session = await sessionStore.findSession(sessionID);
                sessionOptions.store.get(sessionID, (error, session) => {
                    if (error) {
                        next(new Error(`Error get session: ${error}`));
                    }

                    if (session) {
                        socket.sessionID = sessionID;

                        socket.cookie = session.cookie;
                        socket.user_id = session.user_id;
                        socket.login = session.login;
                        socket.role = session.role;
                        socket.token = session.token;
                        socket.first_name = session.first_name;
                        socket.last_name = session.last_name;
                        socket.email = session.email;
                        socket.phone = session.phone;
                        socket.is_authorized = session.is_authorized;
                        socket.connected = session.connected;

                        next();
                    } else {
                        logger.error(`Session not found: ${sessionID}`);
                        next(new Error(`Session not found: ${sessionID}`));
                    }
                });
            } else {
                logger.debug("User unauthorized");
                next(new Error("User unauthorized"));
            }
        });

        this.io.on("connection", async (socket) => {
            // Persist session
            sessionStore.saveSession(socket.sessionID, {
                cookie: socket.cookie,
                user_id: socket.user_id,
                login: socket.login,
                role: socket.role,
                token: socket.token,
                first_name: socket.first_name,
                last_name: socket.last_name,
                email: socket.email,
                phone: socket.phone,
                is_authorized: socket.is_authorized,
                connected: true
            });

            // Emit session details
            socket.emit("session", {
                sessionID: socket.sessionID,
                cookie: socket.cookie,
                user_id: socket.user_id,
                login: socket.login,
                role: socket.role,
                token: socket.token,
                first_name: socket.first_name,
                last_name: socket.last_name,
                email: socket.email,
                phone: socket.phone,
                is_authorized: socket.is_authorized,
                connected: socket.connected
            });

            // Join the "user_id" room
            socket.join(socket.user_id);

            async function findAllSessions() {
                return new Promise((resolve, reject) => {
                    sessionOptions.store.all((err, reply) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(reply);
                        }
                    });
                });
            }

            // Fetch existing messages and sessions
            const users = [];
            const [messages, sessions] = await Promise.all([
                messageStore.findMessagesForUser(socket.user_id),
                findAllSessions()
            ]);

            // Fetch private messages
            const privateMessagesPerUser = new Map();
            messages.forEach((message) => {
                const { type, from, to } = message;
                if (type === "private") {
                    const otherUser = socket.user_id === from ? to : from;
                    if (privateMessagesPerUser.has(otherUser)) {
                        privateMessagesPerUser.get(otherUser).push(message);
                    } else {
                        privateMessagesPerUser.set(otherUser, [message]);
                    }
                }
            });

            // Fetch inbox messages
            const inboxMessagesPerUser = new Map();
            messages.forEach((message) => {
                const { type, from, to } = message;
                if (type === "inbox") {
                    const otherUser = socket.user_id === from ? to : from;
                    if (inboxMessagesPerUser.has(otherUser)) {
                        inboxMessagesPerUser.get(otherUser).push(message);
                    } else {
                        inboxMessagesPerUser.set(otherUser, [message]);
                    }
                }
            });

            sessions.forEach((session) => {
                if (session.is_authorized) {
                    users.push({
                        cookie: session.cookie,
                        user_id: session.user_id,
                        login: session.login,
                        role: session.role,
                        token: session.token,
                        first_name: session.first_name,
                        last_name: session.last_name,
                        email: session.email,
                        phone: session.phone,
                        is_authorized: session.is_authorized,
                        connected: session.connected,
                        private_messages: privateMessagesPerUser.get(session.user_id) || [],
                        inbox_messages: inboxMessagesPerUser.get(session.user_id) || []
                    });
                }
            });

            socket.emit("users", users);

            // Notify existing users
            /*
            socket.broadcast.emit("user connected", {
                cookie: socket.cookie,
                user_id: socket.user_id,
                login: socket.login,
                role: socket.role,
                token: socket.token,
                first_name: socket.first_name,
                last_name: socket.last_name,
                email: socket.email,
                phone: socket.phone,
                is_authorized: socket.is_authorized,
                connected: true,
                inbox_messages: [],
                private_messages: []
            });
            */

            // Forward the private message to the right recipient (and to other tabs of the sender)
            socket.on("private_message", ({ content, to }) => {
                const message = {
                    content,
                    type: "private",
                    push: false,
                    from: socket.user_id,
                    to
                };
                socket.to(to).to(socket.user_id).emit("private_message", message);
                messageStore.saveMessage(message);
            });

            // Forward the inbox message to the right recipient (and to other tabs of the sender)
            socket.on("inbox_message", ({ content, to }) => {
                const message = {
                    content,
                    type: "inbox",
                    push: true,
                    from: socket.user_id,
                    to
                };
                socket.to(to).to(socket.user_id).emit("inbox_message", message);
                messageStore.saveMessage(message);
            });

            // Notify users upon disconnection
            socket.on("disconnect", async () => {
                const matchingSockets = await this.io.in(socket.user_id).allSockets();
                const isDisconnected = matchingSockets.size === 0;
                if (isDisconnected) {
                    // Notify other users
                    // socket.broadcast.emit("user disconnected", socket.user_id);
                    // Update the connection status of the session
                    sessionStore.saveSession(socket.sessionID, {
                        cookie: socket.cookie,
                        user_id: socket.user_id,
                        login: socket.login,
                        role: socket.role,
                        token: socket.token,
                        first_name: socket.first_name,
                        last_name: socket.last_name,
                        email: socket.email,
                        phone: socket.phone,
                        is_authorized: socket.is_authorized,
                        connected: false
                    });
                }
            });

        });

        this.io.listen(httpServer);
    }
}

let socketIOSingleton = new SocketIOSingleton(config, logger);

export default socketIOSingleton;