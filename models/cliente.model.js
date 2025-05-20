import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  nombre: String,
  email: String,
  pujasActivas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Puja' }],
  subastasGanadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carro' }]
});

export default mongoose.model('Cliente', schema);