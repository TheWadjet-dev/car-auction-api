import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  marca: String,
  modelo: String,
  año: Number,
  precioInicial: Number,
  estado: { type: String, enum: ['activo', 'vendido'], default: 'activo' }
}, { timestamps: true });
export default mongoose.model('Carro', schema);