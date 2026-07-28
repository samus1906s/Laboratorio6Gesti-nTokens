// Valida el token enviado por header Authorization: Bearer TOKEN.
// Protege la API de consumo externo (NO usa sesiones).

import { buscarPorTokenHash, actualizarUltimoAcceso } from '../models/aplicacion.model.js';
import { hashToken } from '../utils/token.util.js';

export async function tokenMiddleware(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ mensaje: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const tokenHash = hashToken(token);
    const aplicacion = await buscarPorTokenHash(tokenHash);

    if (!aplicacion || aplicacion.estado !== 'activa') {
      return res.status(401).json({ mensaje: 'Unauthorized' });
    }

    await actualizarUltimoAcceso(aplicacion.id);

    req.aplicacion = aplicacion;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

export default tokenMiddleware;
