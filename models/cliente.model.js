import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, unique: true, index: true },
  wallet: String
});
export default mongoose.model('Cliente', schema);

