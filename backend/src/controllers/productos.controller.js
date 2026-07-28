import { findAllProductos } from '../models/producto.model.js';

/**
 * GET /api/productos
 * Protegido por token.middleware.js (Authorization: Bearer TOKEN)
 */
export async function listar(req, res) {
  try {
    const productos = await findAllProductos();
    return res.json(productos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error del servidor' });
  }
}