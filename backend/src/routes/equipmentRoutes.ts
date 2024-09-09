import { Router } from 'express';
import EquipmentController from '../controllers/equipmentController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.get('/equipment', EquipmentController.getAll);
router.post('/equipment', EquipmentController.add);
router.put('/equipment/:id', EquipmentController.update);
router.delete('/equipment/:id', EquipmentController.delete);

export default router;
