import { Router } from 'express';
import { registrar } from '../controllers/usuario.controller.js';

const router = Router();

router.post('/', registrar);

export default router;