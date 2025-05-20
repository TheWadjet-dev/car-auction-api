import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  modelo: String,
  precioInicial: Number,
  ownerWallet: String,
  estado: { type: String, default: 'activo' },
  fechaLimite: Date
});

export default mongoose.model('Carro', schema);