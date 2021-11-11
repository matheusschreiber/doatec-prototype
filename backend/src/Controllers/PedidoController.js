const connection = require('../database/connection')
const crypto = require('crypto')

const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);
const date = knex.fn.now();

module.exports = {
  async createPedido(request, response){
    const { 
      item,
      quantidade_total,
    } = request.body;

    const comunidade = request.headers.authorization

    await connection('pedidos').insert({
      id: crypto.randomBytes(5).toString('HEX'),
      comunidade,
      data: date,
      item,
      quantidade_total,
      quantidade_doada: 0,
      completo: false
    }).catch(err => {
      throw new Error(err);
    });

    return response.json( {message: "Criado com sucesso!"} )    
  },
  async realizaDoacao(request, response){
    const {id, quantidade} = request.body;    
    const doador = request.headers.authorization
    const [{quantidade_doada}] = await connection('pedidos').where('id', id).select('quantidade_doada')
    const [{quantidade_total}] = await connection('pedidos').where('id', id).select('quantidade_total')
    const valor = quantidade_doada + quantidade

    //adicionar headers aqui para passar o nome do doador junto

    if (!id) return response.status(404).json({error: "Pedido inválido!"})

    if (valor > quantidade_total) {
      return response.status(413).json({error: "Doação extrapolou a cota!"})
    } else if (valor == quantidade_total){
      await connection('pedidos')
          .where('id', id)
          .update('completo', true);  
    }
    await connection('pedidos')
          .where('id', id)
          .update('quantidade_doada', valor);
    return response.json({message: "Doado com sucesso!"})
  },
  async procuraPedido(request, response){
    const { id } = request.params;
    const [pedido] = await connection('pedidos').where('id', id).select('*')
    if (!pedido) return response.status(404).json({error: "Pedido não encontrado"})
    return response.json(pedido);
  },
  async deletaPedido(request, response){
    const { id } = request.params;
    const pedido = await connection('pedidos').where('id', id).del();
    if (!pedido) return response.status(404).json({error: "Pedido não encontrado"})
    return response.json({message: "Apagado com sucesso!"})
  },
  async listaPedido(request, response){
    const comunidade = request.headers.authorization;
    const pedidos = await connection('pedidos')
                      .where('comunidade', comunidade)
                      .select('*')
    return response.json(pedidos)
  }
}