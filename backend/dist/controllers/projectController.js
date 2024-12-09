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
exports.deleteProject = exports.updateProject = exports.getProject = exports.getAllProjects = exports.createProject = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const projectModel_1 = __importDefault(require("../models/projectModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, text, demoUrl, video } = req.body;
    const authenticatedAdminId = req.session.adminId;
    try {
        if (!authenticatedAdminId) {
            throw (0, http_errors_1.default)(401, 'User not authenticated');
        }
        if (!title) {
            throw (0, http_errors_1.default)(400, 'Title is required');
        }
        if (!text) {
            throw (0, http_errors_1.default)(400, 'Text is required');
        }
        const project = yield projectModel_1.default.create({ title, image, text, demoUrl, video });
        res.status(201).json(project);
    }
    catch (error) {
        next(error);
    }
});
exports.createProject = createProject;
const getAllProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projectModel_1.default.find().exec();
        res.status(200).json(projects);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProjects = getAllProjects;
const getProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const authenticatedAdminId = req.session.adminId;
    try {
        if (!authenticatedAdminId) {
            throw (0, http_errors_1.default)(401, 'User not authenticated');
        }
        if (!mongoose_1.default.isValidObjectId(projectId)) {
            throw (0, http_errors_1.default)(400, 'Invalid project id');
        }
        const project = yield projectModel_1.default.findById(projectId).exec();
        if (!project) {
            throw (0, http_errors_1.default)(404, 'project not found');
        }
        res.status(200).json(project);
    }
    catch (error) {
        next(error);
    }
});
exports.getProject = getProject;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newTitle = req.body.title;
    const newImage = req.body.image;
    const newText = req.body.text;
    const newDemoUrl = req.body.demoUrl;
    const authenticatedAdminId = req.session.adminId;
    const projectId = req.params.projectId;
    const newVideo = req.body.video;
    try {
        if (!authenticatedAdminId) {
            throw (0, http_errors_1.default)(401, 'User not authenticated');
        }
        if (!mongoose_1.default.isValidObjectId(projectId)) {
            throw (0, http_errors_1.default)(400, 'Invalid project id');
        }
        // since only title and text are required hence only check them.
        if (!newTitle) {
            throw (0, http_errors_1.default)(400, 'Updating project missing a title');
        }
        if (!newText) {
            throw (0, http_errors_1.default)(400, 'Updating project missing a text');
        }
        const project = yield projectModel_1.default.findById(projectId).exec();
        if (!project) {
            throw (0, http_errors_1.default)(404, 'Project not found');
        }
        Object.assign(project, { title: newTitle, text: newText, image: newImage, demoUrl: newDemoUrl, video: newVideo });
        /*if (!price.userId.equals(authenticatedUserId)) {
          throw createHttpError(401, 'User not authorized');
        }*/
        const updatedProject = yield project.save();
        res.status(200).json(updatedProject);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedAdminId = req.session.adminId;
    const projectId = req.params.projectId;
    console.log("deleting project");
    try {
        if (!authenticatedAdminId) {
            throw (0, http_errors_1.default)(401, 'User not authenticated');
        }
        if (!mongoose_1.default.isValidObjectId(projectId)) {
            throw (0, http_errors_1.default)(400, 'Invalid project id');
        }
        const project = yield projectModel_1.default.findByIdAndDelete(projectId).exec();
        if (!project) {
            throw (0, http_errors_1.default)(404, 'Project not found');
        }
        res.status(200).send('Project is deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProject = deleteProject;
