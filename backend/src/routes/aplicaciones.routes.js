
import { Router } from 'express';
import { requerirAutenticacion } from '../middlewares/auth.middleware.js';
import {crear,listar,desactivar, regenerarToken,} from '../controllers/aplicaciones.controller.js';

const router = Router();

router.use(requerirAutenticacion); // Todas las rutas requieren autenticación

router.post('/', crear); 
router.get('/', listar); 
router.patch('/:id/desactivar', desactivar); 
router.post('/:id/regenerar-token', regenerarToken); 

export default router;