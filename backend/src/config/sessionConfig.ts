import { MemoryStore, SessionOptions } from "express-session";
import MongoStore from "connect-mongo";
import env from '../utils/env';


interface SessionConfig {
    production: SessionOptions;
    development: SessionOptions;
    test: SessionOptions;
    CI: SessionOptions;
}

const sessionConfig: SessionConfig = {
    production: {
        secret: env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000, // 1 hour
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: env.DB_URL,
            collectionName: 'sessions'
        }),
    },
    development: {
        secret: env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000, // 1 hour
            secure: false, 
            httpOnly: true,
            sameSite: 'lax',
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: env.DB_URL,
            collectionName: 'dev_sessions'
        }),
    },
    test: {
        secret: 'test-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 1000 // 1 minute
        },
        store: new MemoryStore()
    },
    CI: {
        secret: 'ci-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 60 * 1000 // 1 minute
        },
        store: new MemoryStore()
    }
}

export default sessionConfig;