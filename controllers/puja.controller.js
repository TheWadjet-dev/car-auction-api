import Puja from '../models/puja.model.js';

export const crearPuja = async (req, res) => {
  try {
    const { carroId, monto } = req.body;

    // Verificar si la subasta está activa y dentro del tiempo límite
    const carro = await Carro.findById(carroId);
    if (!carro || carro.estado !== 'activo') {
      return res.status(400).json({ error: 'El carro no está disponible para subastas' });
    }
    if (new Date() > carro.fechaLimite) {
      return res.status(400).json({ error: 'La subasta ha finalizado' });
    }

    // Verificar si la puja es mayor a la actual
    const pujaMasAlta = await Puja.findOne({ carroId }).sort({ monto: -1 });
    if (pujaMasAlta && monto <= pujaMasAlta.monto) {
      return res.status(400).json({ error: 'La puja debe ser mayor a la actual' });
    }

    // Crear la nueva puja
    const nuevaPuja = new Puja(req.body);
    await nuevaPuja.save();

    res.status(201).json(nuevaPuja);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const obtenerPujas = async (req, res) => {
  try {
    const pujas = await Puja.find().populate('carroId').populate('clienteId');
    res.json(pujas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const obtenerPujasPorCarro = async (req, res) => {
  try {
    const pujas = await Puja.find({ carroId: req.params.carroId })
      .sort({ monto: -1 })
      .populate('clienteId');
    res.json(pujas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const eliminarPuja = async (req, res) => {
  try {
    const puja = await Puja.findByIdAndDelete(req.params.id);
    if (!puja) return res.status(404).json({ error: 'Puja no encontrada' });
    res.json({ mensaje: 'Puja eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


