import { Router } from 'express';
import { OficinaController } from '../controllers/OficinaController';
import { upload } from '../middleware/upload';

const router = Router();

router.put('/oficina/:id', upload.single('avatar'), OficinaController.atualizar);
router.get('/detailOficina/:id', OficinaController.buscarPorId);
router.get('/proximas', OficinaController.buscarProximas);

export default router;
