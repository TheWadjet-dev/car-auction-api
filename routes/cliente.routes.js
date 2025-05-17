import { Router } from 'express';
import {
  registrarCliente
} from '../controllers/cliente.controller.js';

const router = Router();

router.post('/registro', registrarCliente);

export default router;
