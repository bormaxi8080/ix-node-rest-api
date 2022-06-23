'use strict';


/* abstract */ class MessageStore {
    saveMessage(message) {}
    findMessagesForUser(userID) {}
}


class InMemoryMessageStore extends MessageStore {
    constructor() {
        super();
        this.messages = [];
    }

    saveMessage(message) {
        this.messages.push(message);
    }

    findMessagesForUser(userID) {
        return this.messages.filter(
            ({ from, to }) => from === userID || to === userID
        );
    }
}


const CONVERSATION_TTL = 7 * 24 * 60 * 60;


class RedisMessageStore extends MessageStore {
    constructor(redisClient) {
        super();
        this.redisClient = redisClient;
    }

    saveMessage(message) {
        const value = JSON.stringify(message);
        this.redisClient
            .multi()
            .rpush(`messages:${message.type}`, value)
            .rpush(`messages:${message.push}`, value)
            .rpush(`messages:${message.from}`, value)
            .rpush(`messages:${message.to}`, value)
            .expire(`messages:${message.type}`, CONVERSATION_TTL)
            .expire(`messages:${message.push}`, CONVERSATION_TTL)
            .expire(`messages:${message.from}`, CONVERSATION_TTL)
            .expire(`messages:${message.to}`, CONVERSATION_TTL)
            .exec();
    }

    async findMessagesForUser(userID) {
        return new Promise((resolve, reject) => {
            this.redisClient.lrange(`messages:${userID}`, 0, 4, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply.map(msg => JSON.parse(msg)));
                }
            });
        });
    }
}

export {
    InMemoryMessageStore,
    RedisMessageStore,
}