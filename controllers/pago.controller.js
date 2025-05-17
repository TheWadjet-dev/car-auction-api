//import { verificarIdentidad } from '../services/worldid.service.js';
//import { ejecutarPago } from '../services/contrato.service.js';
import Carro from '../models/carro.model.js';
import Transaccion from '../models/transaccion.model.js';

export const procesarPago = async (req, res) => {
  try {
    const { proof, compradorWallet, carroId } = req.body;

    // Verificación World ID
    await verificarIdentidad(proof);

    // Obtener el carro
    const carro = await Carro.findById(carroId);
    if (!carro || carro.estado !== 'activo') {
      return res.status(400).json({ error: 'Carro no disponible' });
    }

    // Simular venta
    const monto = carro.precioInicial;
    const vendedorWallet = carro.ownerWallet;

    // Ejecutar smart contract
    const txHash = await ejecutarPago(vendedorWallet, monto);

    // Marcar como vendido
    carro.estado = 'vendido';
    await carro.save();

    // Registrar transacción
    const transaccion = await Transaccion.create({
      carroId,
      compradorWallet,
      montoPagado: monto,
      comision: monto * 0.01,
      hashTransaccion: txHash
    });

    res.status(200).json({
      mensaje: 'Pago procesado',
      transaccion
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
