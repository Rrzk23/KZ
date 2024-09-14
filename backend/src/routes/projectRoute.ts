import { Router } from 'express';
import * as projectController from '../controllers/projectController'


const router = Router();

router.get('/getAll', projectController.getAllProjects);
router.get('/get/:projectId', projectController.getProject)
router.post('/create', projectController.createProject);
router.patch('/update/:projectId', projectController.updateProject);
router.delete('/delete/:projectId', projectController.deleteProject);


export default router;