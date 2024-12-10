"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
const sessionConfig_1 = __importDefault(require("../config/sessionConfig"));
const env_1 = __importDefault(require("../utils/env"));
const currentSessionConfig = sessionConfig_1.default[env_1.default.NODE_ENV];
exports.sessionMiddleware = (0, express_session_1.default)(currentSessionConfig);
