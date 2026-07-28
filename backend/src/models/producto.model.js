import pool from '../config/db.js';

export async function findAllProductos() {
  const [rows] = await pool.query(
    'SELECT id, nombre, precio, existencia FROM productos'
  );
  return rows;
}