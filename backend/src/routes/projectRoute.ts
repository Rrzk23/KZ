import { Router } from 'express';
import * as projectController from '../controllers/projectController'
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.get('/getAll', projectController.getAllProjects);
router.get('/get/:projectId', requireAuth ,projectController.getProject)
router.post('/create', requireAuth, projectController.createProject);
router.patch('/update/:projectId', requireAuth, projectController.updateProject);
router.delete('/delete/:projectId', requireAuth, projectController.deleteProject);


export default router;