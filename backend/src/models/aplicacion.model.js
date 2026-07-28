import pool from '../config/db';

/**
 * Inserta una nueva aplicación asociada a un usuario.
 */
export async function crearAplicacion({ usuarioId, nombre, descripcion, tokenHash }) {
  const [result] = await pool.query(
    `INSERT INTO aplicaciones (usuario_id, nombre, descripcion, token_hash, estado, fecha_creacion)
     VALUES (?, ?, ?, ?, 'activa', NOW())`,
    [usuarioId, nombre, descripcion, tokenHash]
  );
  return result.insertId;
}

/**
 * Retorna todas las aplicaciones de un usuario.
 */
export async function obtenerAplicacionesPorUsuario(usuarioId) {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, nombre, descripcion, estado, fecha_creacion, ultimo_acceso
     FROM aplicaciones
     WHERE usuario_id = ?
     ORDER BY fecha_creacion DESC`,
    [usuarioId]
  );
  return rows;
}

/**
 * Busca una aplicación por id, sin filtrar por usuario.
 */
export async function obtenerAplicacionPorId(id) {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, nombre, descripcion, estado, fecha_creacion, ultimo_acceso
     FROM aplicaciones WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

/**
 * Cambia el estado de una aplicación. Solo se aceptan los valores 'activa' o 'desactivada'.
 */
export async function actualizarEstado(id, estado) {
  await pool.query(`UPDATE aplicaciones SET estado = ? WHERE id = ?`, [estado, id]);
}

/**
 * Reemplaza el token_hash de una aplicación por uno nuevo. Esto se hace al regenerar el token.
 */
export async function actualizarTokenHash(id, tokenHash) {
  await pool.query(`UPDATE aplicaciones SET token_hash = ? WHERE id = ?`, [tokenHash, id]);
}

/**
 * Busca una aplicación por el hash de su token.
 */
export async function buscarPorTokenHash(tokenHash) {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, nombre, descripcion, estado, fecha_creacion, ultimo_acceso
     FROM aplicaciones WHERE token_hash = ? LIMIT 1`,
    [tokenHash]
  );
  return rows[0];
}

/**
 * Actualiza la marca de último acceso de una aplicación .
 */
export async function actualizarUltimoAcceso(id) {
  await pool.query(`UPDATE aplicaciones SET ultimo_acceso = NOW() WHERE id = ?`, [id]);
}

export default {
  crearAplicacion,
  obtenerAplicacionesPorUsuario,
  obtenerAplicacionPorId,
  actualizarEstado,
  actualizarTokenHash,
  buscarPorTokenHash,
  actualizarUltimoAcceso,
};