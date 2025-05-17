import Cliente from '../models/cliente.model.js';

// Registrar cliente si no existe
export const registrarCliente = async (req, res) => {
  try {
    const { wallet, nombre, correo } = req.body;

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet es requerida' });
    }

    let cliente = await Cliente.findOne({ wallet });

    if (!cliente) {
      cliente = new Cliente({ wallet, nombre, correo });
      await cliente.save();
    }

    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};