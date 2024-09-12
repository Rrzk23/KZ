import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Admin from '../models/adminModel';
import bcrypt from 'bcrypt';

interface AdminSignUp{
    adminName: string;
    passwordRaw: string;
}

interface AdminLoginBody {
    adminName: string;
    passwordRaw: string;
}

export const adminSignUp : RequestHandler<unknown, unknown, AdminSignUp, unknown> = async (req, res, next) => {
    const {adminName, passwordRaw} = req.body;
    try {
        const admin = await Admin
                    .findOne({adminName: adminName})
                    .exec();
        if (admin) {
            throw createHttpError(409, 'adminname already exists');
        }
        const hashedPassword = await bcrypt.hash(passwordRaw, 10);
        const newadmin = await Admin.create({
            adminname : adminName,
            password: hashedPassword
        });
        //req.session.adminId = newadmin._id;
        res.status(201).json(newadmin);

    } catch (err) {
        next(err);
    }
}

export const adminLogin : RequestHandler<unknown, unknown, AdminLoginBody, unknown> = async (req, res, next) => {
    const { adminName, passwordRaw } = req.body;
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
      //req.session.adminId = admin._id;
      res.status(201).json(admin);
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

export const adminLogout : RequestHandler = async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ message: 'Logged out' });
      }
    });
}

