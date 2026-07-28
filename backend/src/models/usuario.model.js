
const pool = require('../config/db');


async function buscarPorCorreo(correo) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  return rows[0];
}


async function buscarPorId(id) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}


async function crear({ nombre, correo, contrasena }) {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contrasena, fecha_registro) VALUES (?, ?, ?, NOW())',
    [nombre, correo, contrasena]
  );
  return result.insertId;
}

module.exports = { buscarPorCorreo, buscarPorId, crear };
