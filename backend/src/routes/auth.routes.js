import { Router } from "express";

import {
  iniciarSesion,
  consultarPerfil,
  cerrarSesion,
} from "../controllers/autenticacion.controller.js";

import {
  requerirAutenticacion,
} from "../middlewares/autenticacion.middleware.js";

const router = Router();


router.post("/login", iniciarSesion);


router.get(
  "/perfil",
  requerirAutenticacion,  /* ESTAS ACÁ SERIAN LAS RUTAS PROTEGIDAS DE SESIÓN */
  consultarPerfil,
);

router.post(
  "/logout",
  requerirAutenticacion,
  cerrarSesion,
);

export default router;
