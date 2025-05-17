import { Router } from 'express';
import { crearPuja, obtenerPujas, obtenerPujasPorCarro, eliminarPuja } from '../controllers/puja.controller.js';
const router = Router();

router.post('/', crearPuja);
router.get('/', obtenerPujas);
router.get('/carro/:carroId', obtenerPujasPorCarro);
router.delete('/:id', eliminarPuja);
export default router;
