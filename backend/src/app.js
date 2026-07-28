import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import usuarioRoutes from './routes/usuario.routes.js';
import sessionMiddleware from "./config/session.js";
import authRoutes from './routes/auth.routes.js';
import aplicacionesRoutes from './routes/aplicaciones.routes.js';
import productosRoutes from './routes/productos.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(sessionMiddleware);

app.use('/api/usuario', usuarioRoutes);
app.use('/api/auth', rutasAutenticacion);
app.use('/api/aplicaciones', aplicacionesRoutes);
app.use('/api/productos', productosRoutes);

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

export default app;