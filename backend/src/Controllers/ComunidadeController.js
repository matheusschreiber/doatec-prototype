const connection = require('../database/connection')
const { createHash } = require('crypto')
const crypto = require('crypto')

module.exports = {
  async cadastrarComunidade(request, response){
    const { nome, senha, email, cidade, uf, foto } = request.body;
    const hash = createHash('sha256');
    hash.update(senha);
    await connection('comunidades').insert({
      id: crypto.randomBytes(5).toString('HEX'),
      nome,
      senha:hash.digest('hex'),
      email,
      cidade,
      uf,
      foto
    })
    return response.json({message: "Comunidade criada com sucesso!"})
  },
  async logarComunidade(request, response){
    const { nome, senha_log } = request.body;
    try {
      const [{senha, id}] = await connection('comunidades').where('nome', nome).select(['id','senha']);
      const hash = createHash('sha256');
      hash.update(senha_log);
      if (senha == hash.digest('hex')) {
        return response.status(202).json({
          message: "Logado com sucesso!",
          id_comu: id
        })
      }
    } catch (err) {
      return response.status(401).json({message: 'Senha/Nome incorreta(o)'})  
    }
    return response.status(401).json({message: 'Senha/Nome incorreta(o)'})
  },
  async listaComunidade(request, response){
    const id = request.headers.authorization;
    try {
      if (id==="admin") {
        const comunidades = await connection('comunidades').select('*')        
        return response.json(comunidades)
      }
      const [comunidades] = await connection('comunidades').where('id', id).select('*')
      if (!comunidades) return response.status(401).json({message: "Faça login novamente"})
      return response.json(comunidades)
    } catch (err) {
      return response.status(401).json({message: "Faça login novamente"})
    }
  }
}