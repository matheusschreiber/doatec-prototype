const express = require('express');
const router = express.Router()

const ComunidadeController = require('./Controllers/ComunidadeController');
const PedidoController = require('./Controllers/PedidoController')

router.post('/pedido', PedidoController.createPedido);
router.put('/pedido/:id', PedidoController.realizaDoacao);
router.get('/pedido/:id', PedidoController.procuraPedido);
router.get('/pedidosc', PedidoController.listaPedido);
router.delete('/pedido/:id', PedidoController.deletaPedido);
router.get('/doadores/:id', PedidoController.listaDoadores)

router.post('/comunidade', ComunidadeController.cadastrarComunidade);
router.post('/login', ComunidadeController.logarComunidade);

module.exports = router;