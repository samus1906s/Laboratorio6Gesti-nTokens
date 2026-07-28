export function requerirAutenticacion(req, res, next){
    const usuarioAutenticado = req.session?.usuario;

    if(!usuarioAutenticado){
        return res.status(401).json({
            ok: false,
            mensaje: "El usuario nok se encuentra"
        });
    }

    next();
}