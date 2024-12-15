"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Define rate limiter for email sending
exports.emailRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 1, // Limit each IP to 1 request per windowMs
    message: {
        message: 'You can only send one email per minute. Please try again later.',
    },
});
