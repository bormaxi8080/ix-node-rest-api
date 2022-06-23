'use strict';


/* abstract */ class SessionStore {
    findSession(id) {}
    saveSession(id, session) {}
    findAllSessions() {}
}


class InMemorySessionStore extends SessionStore {
    constructor() {
        super();
        this.sessions = new Map();
    }

    findSession(id) {
        return this.sessions.get(id);
    }

    saveSession(id, session) {
        this.sessions.set(id, session);
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}


const SESSION_TTL = 7 * 24 * 60 * 60;
const mapSession = ([cookie, user_id, login, role, token, first_name, last_name, email, phone, is_authorized, connected]) =>
    user_id ? { cookie, user_id, login, role, token, first_name, last_name, email, phone, is_authorized, connected: connected === "true" } : undefined;


class RedisSessionStore extends SessionStore {
    constructor(redisClient) {
        super();
        this.redisClient = redisClient;
    }

    findSession(id) {
        return this.redisClient
            .hmget(`sess:${id}`, "cookie", "user_id", "login", "role", "token", "first_name", "last_name", "email", "phone", "is_authorized", "connected")
            .then(mapSession);
    }

    saveSession(id, { cookie, user_id, login, role, token, first_name, last_name, email, phone, is_authorized, connected }) {
        this.redisClient
            .multi()
            .hset(
                `sess:${id}`,
                "cookie",
                cookie,
                "user_id",
                user_id,
                "login",
                login,
                "role",
                role,
                "token",
                token,
                "first_name",
                first_name,
                "last_name",
                last_name,
                "email",
                email,
                "phone",
                phone,
                "is_authorized",
                is_authorized,
                "connected",
                connected
            )
            .expire(`sess:${id}`, SESSION_TTL)
            .exec();
    }

    async findAllSessions() {
        const keys = new Set();
        let nextIndex = 0;

        do {
            const [nextIndexAsStr, results] = await this.redisClient.scan(
                nextIndex,
                "MATCH",
                "sess:*",
                "COUNT",
                "100"
            );
            nextIndex = parseInt(nextIndexAsStr, 10);
            results.forEach((s) => keys.add(s));
        } while (nextIndex !== 0);

        const commands = [];
        keys.forEach((key) => {
            commands.push(["hmget", key, "cookie", "user_id", "login", "role", "token", "first_name", "last_name", "email", "phone", "connected"]);
        });

        return this.redisClient
            .multi(commands)
            .exec()
            .then((results) => {
                return results
                    .map(([err, session]) => (err ? undefined : mapSession(session)))
                    .filter((v) => !!v);
            });
    }
}

export {
    InMemorySessionStore,
    RedisSessionStore
}