"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import * as authController from '../controllers/authController';
//import { requireAuth } from '../middleware/auth';
const router = (0, express_1.Router)();
/*
router.get('/', requireAuth, authController.getAuthenticatedUser);
router.post('/login', authController.loginUser); // Add POST route for filter
router.post('/logout', authController.logoutUser);
*/
exports.default = router;
