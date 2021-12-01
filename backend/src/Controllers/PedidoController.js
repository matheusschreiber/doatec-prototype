const connection = require('../database/connection')
const crypto = require('crypto')

const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);
const date = knex.fn.now();

module.exports = {
  async createPedido(request, response){
    const { item, quantidade_total } = request.body;
    const comunidade = request.headers.authorization

    const generatedID = crypto.randomBytes(5).toString('HEX')

    const pedido = {
      id: generatedID,
      comunidade: comunidade,
      item: item,
      quantidade_total: quantidade_total,
      quantidade_doada: 0,
      completo: false
    }
    await connection('pedidos').insert(pedido);
    const [{data}] = await connection('pedidos').where('id', generatedID).select('data')
    pedido['data'] = data
    return await response.json(pedido)    
  },

  async realizaDoacao(request, response){
    const {quantidade} = request.body;    
    const { id } = request.params;
    if (!id) return response.status(404).json({error: "ID do pedido não informado!"})
    
    try {
      const doador = request.headers.authorization;
      const [{ quantidade_doada, quantidade_total }] = await connection('pedidos')
        .where('id', id)
        .select(['quantidade_doada','quantidade_total'])
      
      if (!doador) return response.status(404).json({error: "Doador não informado!"})     
      if (!quantidade_doada && !quantidade_total) {
        return response.status(404).json({error: "ID do pedido inválido!"})
      }

      const valor = quantidade_doada + quantidade
      if (valor > quantidade_total) {
        return response.status(413).json({error: "Doação extrapolou a cota!"})
      } else if (valor == quantidade_total){
        await connection('pedidos')
            .where('id', id)
            .update('completo', true);  
      }
      
      let saldo_doador=0
      try {
        const [{ qtd_doada }] = await connection('doadores')
          .where({"nome": doador, "id_pedido": id })
          .select('qtd_doada')
        saldo_doador = qtd_doada
      } catch(err){}
      await connection('pedidos')
            .where('id', id)
            .update('quantidade_doada', valor);
      
      if(saldo_doador) {
        saldo_doador += quantidade;
        await connection('doadores')
        .where({'nome': doador, 'id_pedido': id })
        .update('qtd_doada', saldo_doador)
      } else {
        await connection('doadores')
        .insert({
          nome: doador,
          id_pedido: id,
          qtd_doada: quantidade
        })
      }
      return response.json({message: "Doado com sucesso!"}) 
    } catch (err) {
      console.log(err)
      return response.status(404).json({
        error: "Problema na doação!",
        reason: err
      })
    }
  },

  async procuraPedido(request, response){
    const { nomeDoItem } = request.params;
    const [pedido] = await connection('pedidos').where('item', nomeDoItem).select('*')
    if (!pedido) return response.status(404).json({error: "Pedido não encontrado"})
    return response.json(pedido);
  },

  async deletaPedido(request, response){
    const { id } = request.params;
    const id_comunidade = request.headers.authorization;
    try{
      const pedido = await connection('pedidos').where({'id': id, 'comunidade': id_comunidade}).del();
      if (!pedido) return response.status(404).json({error: "Pedido não encontrado"})
      await connection('doadores').where('id_pedido', id).del();
      return response.json({message: "Apagado com sucesso!"})
    } catch (err) {
      return response.status(401).json({message: "Comunidade não autorizada"})
    }
  },

  async listaPedido(request, response){
    const {page=1} = request.query
    const id_comunidade = request.headers.authorization;
    let pedidos = []
    if (id_comunidade){
      pedidos = await connection('pedidos')
        .where('comunidade', id_comunidade)
        // .limit(5)
        // .offset((page-1)*5)
        .select('pedidos.*')
        .join('comunidades', 'comunidades.id', 'pedidos.comunidade')
        .select([
          "comunidades.nome",
          "comunidades.email",
          "comunidades.cidade",
          "comunidades.uf",
          "comunidades.foto"
        ])
    } else {
      pedidos = await connection('pedidos')
      .join('comunidades', 'comunidades.id', 'pedidos.comunidade')
      .limit(5)
      .offset((page-1) * 5)
      .select([
        "pedidos.*",
        "comunidades.nome",
        "comunidades.email",
        "comunidades.cidade",
        "comunidades.uf",
        "comunidades.foto"
      ])
    }    
    return response.json(pedidos)
  },

  async listaDoadores(request, response){
    const { id } = request.params;
    const doacoes = await connection('doadores')
      .where('id_pedido', id)
      .select('*')
   
    return response.json(doacoes)
  }
}