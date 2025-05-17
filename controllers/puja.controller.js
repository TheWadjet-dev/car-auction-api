import Puja from '../models/puja.model.js';

export const crearPuja = async (req, res) => {
  try {
    const puja = new Puja(req.body);
    await puja.save();
    res.status(201).json(puja);
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
