import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Admin from '../models/adminModel';

import bcrypt from 'bcrypt';

interface AdminSignUp{
    adminName: string;
    password: string;
}

interface AdminLoginBody {
    adminName: string;
    password: string;
}

export const adminSignUp : RequestHandler<unknown, unknown, AdminSignUp, unknown> = async (req, res, next) => {
    const {adminName} = req.body;
    const passwordRaw = req.body.password;
    try {
        const admin = await Admin
        .findOne()
        .exec();
        if (admin) {
            throw createHttpError(409, 'admin already exists');
        }
        const hashedPassword = await bcrypt.hash(passwordRaw, 10);
        const newadmin = await Admin.create({
            adminName : adminName,
            password: hashedPassword
        });
        req.session.adminId = newadmin._id;
        res.status(201).json(newadmin);

    } catch (err) {
        console.log(err)
        next(err);

    }
}

export const adminLogin : RequestHandler<unknown, unknown, AdminLoginBody, unknown> = async (req, res, next) => {
    const { adminName } = req.body;
    const passwordRaw = req.body.password;
    try {
      if (!adminName || !passwordRaw) { 
        throw createHttpError(400, 'Admin name or password missing');
      }
      const admin = await Admin
        .findOne({adminName: adminName})
        .select('+password')
        .exec();
      if (!admin) {
        throw createHttpError(404, 'Admin not found');
      }
      const isPasswordValid = await bcrypt.compare(passwordRaw, admin.password);
      if (!isPasswordValid) {
        throw createHttpError(401, 'Incorrect password or email');
      }
      req.session.adminId = admin._id;
      console.log('Session created:', req.session);
      req.session.save((err) => {
        if (err) {
          console.error('Error saving session:', err);
          next(err);
        } else {
          console.log('Session saved successfully:', req.session);
          res.status(201).json(admin);
        }
      });
    } catch (error) {
      next(error);
    }
    
};

export const getAuthAdmin : RequestHandler = async (req, res, next) => {
    
    const authenticatedAdminId = req.session.adminId;
    try {
        const admin = await Admin
          .findById(authenticatedAdminId)
          .exec();
        res.status(200).json(admin);
    
      } catch (error) {
        next(error);
      }
};

export const adminLogout : RequestHandler =  (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ message: 'Logged out' });
      }
    });
}

