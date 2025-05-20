import Carro from '../models/carro.model.js';
import schedule from 'node-schedule';


export const crearCarro = async (req, res) => {
  try {
    const carro = new Carro(req.body);
    await carro.save();
    res.status(201).json(carro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const obtenerCarros = async (req, res) => {
  try {
    const carros = await Carro.find();
    res.json(carros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const obtenerCarroPorId = async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id);
    if (!carro) return res.status(404).json({ error: 'Carro no encontrado' });
    res.json(carro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarCarro = async (req, res) => {
  try {
    const carro = await Carro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!carro) return res.status(404).json({ error: 'Carro no encontrado' });
    res.json(carro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const eliminarCarro = async (req, res) => {
  try {
    const carro = await Carro.findByIdAndDelete(req.params.id);
    if (!carro) return res.status(404).json({ error: 'Carro no encontrado' });
    res.json({ mensaje: 'Carro eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearPuja = async (req, res) => {
  try {
    const { carroId, clienteId, monto } = req.body;

    // Verificar si la puja es mayor a la actual
    const pujaMasAlta = await Puja.findOne({ carroId }).sort({ monto: -1 });
    if (pujaMasAlta && monto <= pujaMasAlta.monto) {
      return res.status(400).json({ error: 'La puja debe ser mayor a la actual' });
    }

    // Crear la nueva puja
    const nuevaPuja = new Puja(req.body);
    await nuevaPuja.save();

    // Actualizar las pujas activas del cliente
    const cliente = await Cliente.findById(clienteId);
    cliente.pujasActivas.push(nuevaPuja._id);
    await cliente.save();

    res.status(201).json(nuevaPuja);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

schedule.scheduleJob('*/1 * * * *', async () => {
  const ahora = new Date();
  const carrosFinalizados = await Carro.find({ estado: 'activo', fechaLimite: { $lte: ahora } });

  for (const carro of carrosFinalizados) {
    carro.estado = 'finalizado';
    await carro.save();

    // Registrar al ganador
    const pujaGanadora = await Puja.findOne({ carroId: carro._id }).sort({ monto: -1 });
    if (pujaGanadora) {
      const cliente = await Cliente.findById(pujaGanadora.clienteId);
      cliente.subastasGanadas.push(carro._id);
      await cliente.save();
    }
  }
});