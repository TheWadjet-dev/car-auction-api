import { Router } from 'express';
import { crearCarro, obtenerCarros, obtenerCarroPorId, actualizarCarro, eliminarCarro } from '../controllers/carro.controller.js';
const router = Router();

router.post('/', crearCarro);
router.get('/', obtenerCarros);
router.get('/:id', obtenerCarroPorId);
router.put('/:id', actualizarCarro);
router.delete('/:id', eliminarCarro);
export default router;