import Carro from '../models/carro.model.js';

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
