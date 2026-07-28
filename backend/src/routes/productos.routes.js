import { Router } from 'express';
import { requireToken } from '../middlewares/token.middleware.js';
import { listar } from '../controllers/productos.controller.js';

const router = Router();

router.get('/', requireToken, listar);

export default router;