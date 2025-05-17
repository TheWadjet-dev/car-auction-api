import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  carroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carro' },
  monto: Number
}, { timestamps: true });
schema.index({ carroId: 1, monto: -1 });
export default mongoose.model('Puja', schema);
