
import {
  crearAplicacion,
  obtenerAplicacionesPorUsuario,
  obtenerAplicacionPorId,
  actualizarEstado,
  actualizarTokenHash,} from '../models/aplicacion.model.js';
import { generarToken, hashToken } from '../utils/token.util.js';

// POST /api/aplicaciones
export async function crear(req, res) {
  try {
    const { nombre, descripcion } = req.body;
    const usuarioId = req.session.usuario.id;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre de la aplicación es obligatorio' });
    }

    const tokenPlano = generarToken();
    const tokenHash = hashToken(tokenPlano);

    const id = await crearAplicacion({
      usuarioId,
      nombre,
      descripcion: descripcion || null,
      tokenHash,
    });

   
    return res.status(201).json({
      id,
      nombre,
      descripcion: descripcion || null,
      estado: 'activa',
      token: tokenPlano,
      aviso: 'Guarda este token ahora, no podrá volver a mostrarse.',
    });
  } catch (error) {
    console.error('Error al crear aplicación:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// GET /api/aplicaciones
export async function listar(req, res) {
  try {
    const usuarioId = req.session.usuario.id;
    const aplicaciones = await obtenerAplicacionesPorUsuario(usuarioId);
    return res.status(200).json(aplicaciones);
  } catch (error) {
    console.error('Error al listar aplicaciones:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// PATCH /api/aplicaciones/:id/desactivar
export async function desactivar(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.session.usuario.id;

    const aplicacion = await obtenerAplicacionPorId(id);

    if (!aplicacion) {
      return res.status(404).json({ error: 'Aplicación no encontrada' });
    }

    if (aplicacion.usuario_id !== usuarioId) {
      return res.status(403).json({ error: 'No tiene permiso sobre esta aplicación' });
    }

    await actualizarEstado(id, 'inactiva');

    return res.status(200).json({ mensaje: 'Aplicación desactivada correctamente' });
  } catch (error) {
    console.error('Error al desactivar aplicación:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// POST /api/aplicaciones/:id/regenerar-token (reto opcional)
export async function regenerarToken(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.session.usuario.id;

    const aplicacion = await obtenerAplicacionPorId(id);

    if (!aplicacion) {
      return res.status(404).json({ error: 'Aplicación no encontrada' });
    }

    if (aplicacion.usuario_id !== usuarioId) {
      return res.status(403).json({ error: 'No tiene permiso sobre esta aplicación' });
    }

    const tokenPlano = generarToken();
    const tokenHash = hashToken(tokenPlano);

    await actualizarTokenHash(id, tokenHash);

    return res.status(200).json({
      mensaje: 'Token regenerado correctamente. El token anterior ya no es válido.',
      token: tokenPlano,
    });
  } catch (error) {
    console.error('Error al regenerar token:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export default { crear, listar, desactivar, regenerarToken };