import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.get('/', requireAuth, adminController.getAuthAdmin);
router.post('/login', adminController.adminLogin); // Add POST route for filter
router.post('/logout', adminController.adminLogout);
router.post('/signup', adminController.adminSignUp);


export default router;