import { Router } from "express";

import {
  iniciarSesion,
  consultarPerfil,
  cerrarSesion,
} from "../controllers/auth.controller.js";

import {
  requerirAutenticacion,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", iniciarSesion);

router.get(
  "/perfil",
  requerirAutenticacion,
  consultarPerfil,
);

router.post(
  "/logout",
  requerirAutenticacion,
  cerrarSesion,
);

export default router;