const express = require('express')
const router = express.Router()

const PedidoController = require('./Controllers/PedidoController')

router.post('/pedido', PedidoController.createPedido);
router.put('/pedido', PedidoController.realizaDoacao);
router.get('/pedido/:id', PedidoController.procuraPedido);
router.get('/pedido', PedidoController.listaPedido);
router.delete('/pedido/:id', PedidoController.deletaPedido);

module.exports = router;