"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogout = exports.getAuthAdmin = exports.adminLogin = exports.adminSignUp = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminName } = req.body;
    const passwordRaw = req.body.password;
    try {
        const admin = yield adminModel_1.default
            .findOne()
            .exec();
        if (admin) {
            throw (0, http_errors_1.default)(409, 'admin already exists');
        }
        const hashedPassword = yield bcrypt_1.default.hash(passwordRaw, 10);
        const newadmin = yield adminModel_1.default.create({
            adminName: adminName,
            password: hashedPassword
        });
        req.session.adminId = newadmin._id;
        res.status(201).json(newadmin);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.adminSignUp = adminSignUp;
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminName } = req.body;
    const passwordRaw = req.body.password;
    try {
        if (!adminName || !passwordRaw) {
            throw (0, http_errors_1.default)(400, 'Admin name or password missing');
        }
        const admin = yield adminModel_1.default
            .findOne({ adminName: adminName })
            .select('+password')
            .exec();
        if (!admin) {
            throw (0, http_errors_1.default)(404, 'Admin not found');
        }
        const isPasswordValid = yield bcrypt_1.default.compare(passwordRaw, admin.password);
        if (!isPasswordValid) {
            throw (0, http_errors_1.default)(401, 'Incorrect password or email');
        }
        req.session.adminId = admin._id;
        console.log('Session created:', req.session);
        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
                next(err);
            }
            else {
                console.log('Session saved successfully:', req.session);
                res.status(201).json(admin);
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.adminLogin = adminLogin;
const getAuthAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedAdminId = req.session.adminId;
    try {
        const admin = yield adminModel_1.default
            .findById(authenticatedAdminId)
            .exec();
        res.status(200).json(admin);
    }
    catch (error) {
        next(error);
    }
});
exports.getAuthAdmin = getAuthAdmin;
const adminLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err);
        }
        else {
            res.status(200).json({ message: 'Logged out' });
        }
    });
};
exports.adminLogout = adminLogout;
