import express from 'express';
import carroRoutes from './routes/carro.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import pujaRoutes from './routes/puja.routes.js';
import pagoRoutes from './routes/pago.routes.js';

const app = express();
app.use(express.json());

app.use('/api/carros', carroRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pujas', pujaRoutes);
app.use('/api/pago', pagoRoutes);

app.get('/', (req, res) => res.send('API de Subastas de Carros'));

export default app;
