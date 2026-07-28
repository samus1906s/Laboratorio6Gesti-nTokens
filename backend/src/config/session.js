import session from "express-session";

const middlewareSesion = session({
  secret:
    process.env.SESSION_SECRET ||
    "clave_temporal_laboratorio",

  resave: false,
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  },
});

export default middlewareSesion;