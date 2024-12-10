import { RequestHandler } from 'express';
import createHttpError from 'http-errors';


export const requireAuth : RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {
  if (req.session.adminId) {
    next();
  } else {
    next(createHttpError(401, 'User not authenticated'));
  }
};