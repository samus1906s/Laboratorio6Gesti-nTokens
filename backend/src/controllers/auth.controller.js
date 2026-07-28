import bcrypt from "bcrypt";
import pool from "../config/db.js";


export async function iniciarSesion(req, res) {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || correo.trim() === "") {
      return res.status(400).json({
        ok: false,
        mensaje: "El correo es obligatorio.",
      });
    }

    if (!contrasena || contrasena.trim() === "") {
      return res.status(400).json({
        ok: false,
        mensaje: "La contraseña es obligatoria.",
      });
    }

    const correoNormalizado = correo.trim().toLowerCase();

    const [usuarios] = await pool.query(
      `SELECT id, nombre, correo, contrasena
       FROM usuarios
       WHERE correo = ?`,
      [correoNormalizado],
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        ok: false,
        mensaje: "Credenciales incorrectas.",
      });
    }

    const usuarioEncontrado = usuarios[0];

    const contrasenaCorrecta = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.contrasena,
    );

    if (!contrasenaCorrecta) {
      return res.status(401).json({
        ok: false,
        mensaje: "Credenciales incorrectas.",
      });
    }

    req.session.usuario = {
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
      correo: usuarioEncontrado.correo,
    };

    return res.status(200).json({
      ok: true,
      mensaje: "Inicio de sesión correcto.",
      usuario: req.session.usuario,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    return res.status(500).json({
      ok: false,
      mensaje: "Ocurrió un error interno al iniciar sesión.",
    });
  }
}


export function consultarPerfil(req, res) {
  return res.status(200).json({
    ok: true,
    usuario: req.session.usuario,
  });
}


export function cerrarSesion(req, res) {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error al cerrar sesión:", error);

      return res.status(500).json({
        ok: false,
        mensaje: "No fue posible cerrar la sesión.",
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      ok: true,
      mensaje: "Sesión cerrada correctamente.",
    });
  });
}