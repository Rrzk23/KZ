import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Project from '../models/projectModel';
import mongoose from 'mongoose';


interface CreateProjectBody {
    title: string;
    image?: string,
    text: string,
    demoUrl?: string,
}

export const createProject : RequestHandler<unknown, unknown, CreateProjectBody, unknown> = async (req, res, next) => {
    const { title, image, text, demoUrl} = req.body;
    const authenticatedAdminId = req.session.adminId;
    try {
        if (!authenticatedAdminId) {
            throw createHttpError(401, 'User not authenticated');
        }
        if (!title) {
            throw createHttpError(400, 'Title is required');
        }
        if (!text) {
            throw createHttpError(400, 'Text is required');
        }
        const project = await Project.create({title, image, text, demoUrl});
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

export const getAllProjects : RequestHandler = async (req, res, next) => {
    
    try {

        const projects = await Project.find().exec();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
}

export const getProject : RequestHandler = async (req, res, next) => {
    const projectId = req.params.projectId;
    const authenticatedAdminId = req.session.adminId;
    try {
      if (!authenticatedAdminId) {
        throw createHttpError(401, 'User not authenticated');
      }
      if (!mongoose.isValidObjectId(projectId)) {
        throw createHttpError(400, 'Invalid project id');
      }
      const project = await Project.findById(projectId).exec();
      if (!project) {
        throw createHttpError(404, 'project not found');
      }
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
    
  };

  interface UpdateProjectParam {
    projectId: string;
  }

  interface UpdateProjectBody {
    title?: string;
    image?: string;
    text?: string;
    demoUrl?: string;
  }
  export const updateProject : RequestHandler<UpdateProjectParam, unknown, UpdateProjectBody, unknown> = async (req, res, next) => {
    const newTitle = req.body.title;
    const newImage = req.body.image;
    const newText = req.body.text;
    const newDemoUrl = req.body.demoUrl;
    const authenticatedAdminId = req.session.adminId;
    const projectId = req.params.projectId;
    try {
      if (!authenticatedAdminId) {
        throw createHttpError(401, 'User not authenticated');
      }
      if (!mongoose.isValidObjectId(projectId)) {
        throw createHttpError(400, 'Invalid project id');
      }
      // since only title and text are required hence only check them.
      if (!newTitle) {
        throw createHttpError(400, 'Updating project missing a title');
      }
      if (!newText) {
        throw createHttpError(400, 'Updating project missing a text');
      }
      const project = await Project.findById(projectId).exec();
      if (!project) {
        throw createHttpError(404, 'Project not found');
      }
      Object.assign(project, { title : newTitle, text: newText, image: newImage, demoUrl: newDemoUrl });
      /*if (!price.userId.equals(authenticatedUserId)) {
        throw createHttpError(401, 'User not authorized');
      }*/
      const updatedProject = await project.save();
      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  };

  export const deleteProject : RequestHandler = async (req, res, next) => {
    const authenticatedAdminId = req.session.adminId;
    const projectId = req.params.projectId;
    console.log("deleting project");
    try {
      if (!authenticatedAdminId) {
        throw createHttpError(401, 'User not authenticated');
      }
      if (!mongoose.isValidObjectId(projectId)) {
        throw createHttpError(400, 'Invalid project id');
      }
      const project = await Project.findByIdAndDelete(projectId).exec();
      if (!project) {
        throw createHttpError(404, 'Project not found');
      }
      res.status(200).send('Project is deleted');
    } catch (error) {
      next(error);
    }
  };
