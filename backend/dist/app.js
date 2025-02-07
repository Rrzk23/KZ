"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config.js");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = require("http-errors");
const session_1 = require("./middlewares/session");
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const utilRoute_1 = __importDefault(require("./routes/utilRoute"));
const projectRoute_1 = __importDefault(require("./routes/projectRoute"));
const dividendRoute_1 = __importDefault(require("./routes/dividendRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = process.env.NODE_ENV === 'production'
    ? {
        origin: ['https://kezhu.onrender.com', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }
    : {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    };
app.use((0, cors_1.default)(corsOptions));
app.use(session_1.sessionMiddleware);
app.use((0, morgan_1.default)('dev'));
app.use('/api/projects', projectRoute_1.default);
app.use('/api/auth', adminRoute_1.default);
app.use('/api/util', utilRoute_1.default);
app.use('/api/dividend', dividendRoute_1.default);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    let errorMessage = 'an unknown error occurred';
    let statuscode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statuscode = error.status;
        errorMessage = error.message;
    }
    console.error(error);
    res.status(statuscode).json({ error: errorMessage });
});
exports.default = app;
