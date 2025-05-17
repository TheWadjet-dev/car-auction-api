// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarAuction {
    address public owner;
    uint256 public feePercent = 1;

    constructor() {
        owner = msg.sender;
    }

    event PagoRealizado(address comprador, address vendedor, uint monto, uint comision, string mensaje);

    function realizarPago(address payable vendedor, uint monto) public payable {
        uint comision = (monto * feePercent) / 100;
        require(msg.value >= monto + comision, "Fondos insuficientes");

        vendedor.transfer(monto);
        payable(owner).transfer(comision);

        emit PagoRealizado(msg.sender, vendedor, monto, comision, "Pago procesado exitosamente");
    }
}
