const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcrypt');


async function registrar(req, res) {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ mensaje: 'Nombre, correo y contraseña son obligatorios' });
    }

    const usuarioExistente = await usuarioModel.buscarPorCorreo(correo);
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El correo ya se encuentra registrado' });
    }

    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const id = await usuarioModel.crear({ nombre, correo, contrasena: contrasenaHash });

    return res.status(201).json({ id, nombre, correo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

module.exports = { registrar };
