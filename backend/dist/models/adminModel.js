"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    adminName: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true, select: false },
});
exports.default = (0, mongoose_1.model)('Admin', adminSchema);
