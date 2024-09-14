"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    title: { type: 'string', required: true },
    image: { type: 'string' },
    text: { type: 'string', required: true },
    demoUrl: { type: 'string' },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Project', projectSchema);
