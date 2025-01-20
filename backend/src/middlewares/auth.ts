import { RequestHandler } from 'express';
import createHttpError from 'http-errors';


export const requireAuth : RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {
  console.log('Session Middleware Debug:', req.session);
  if (req.session.adminId) {
    next();
  } else {
    next(createHttpError(401, 'User not authenticated'));
  }
};