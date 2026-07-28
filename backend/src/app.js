const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secreto_temporal',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, 
    },
  })
);

app.use('/api/usuario', require('./routes/usuario.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/aplicaciones', require('./routes/aplicaciones.routes'));
app.use('/api/productos', require('./routes/productos.routes'));

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Plataforma de Gestión de Tokens funcionando' });
});

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});