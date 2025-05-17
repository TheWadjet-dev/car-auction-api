import { Router } from 'express';
import { procesarPago } from '../controllers/pago.controller.js';
const router = Router();

router.post('/', procesarPago);
export default router;
