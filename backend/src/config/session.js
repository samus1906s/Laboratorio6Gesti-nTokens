import session from "express-session";

const middlewareSesion = session ({

    secret: process.env.SESSION_SECRET || "clase1234",

    resave: false,

    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 100*60*60,
    },
})

export default sesionMiddleware;