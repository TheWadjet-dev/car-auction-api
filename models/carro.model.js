import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  marca: String,
  modelo: String,
  año: Number,
  precioInicial: Number,
  ownerWallet: String,
  estado: { type: String, default: 'activo' },
  fechaLimite: Date
});

export default mongoose.model('Carro', schema);