"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = require("express-session");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const env_1 = __importDefault(require("../utils/env"));
const sessionConfig = {
    production: {
        secret: env_1.default.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000, // 1 hour
            secure: true,
        },
        rolling: true,
        store: connect_mongo_1.default.create({
            mongoUrl: env_1.default.DB_URL,
            collectionName: 'sessions'
        }),
    },
    development: {
        secret: env_1.default.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000, // 1 hour
            secure: false,
            httpOnly: true,
            sameSite: 'lax',
        },
        rolling: true,
        store: connect_mongo_1.default.create({
            mongoUrl: env_1.default.DB_URL,
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
        store: new express_session_1.MemoryStore()
    },
    CI: {
        secret: 'ci-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 60 * 1000 // 1 minute
        },
        store: new express_session_1.MemoryStore()
    }
};
exports.default = sessionConfig;
