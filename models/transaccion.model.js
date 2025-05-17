import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  carroId: mongoose.Types.ObjectId,
  compradorWallet: String,
  montoPagado: Number,
  comision: Number,
  hashTransaccion: String,
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model('Transaccion', schema);
