import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import * as utilController from '../controllers/utilController';
const router = Router();

router.get('/imagekit' ,utilController.adminImagekit);
router.get('/',requireAuth ,utilController.adminImagekit);
router.post('/sendContactEmail' ,emailRateLimiter,utilController.sendContactEmail);

export default router;