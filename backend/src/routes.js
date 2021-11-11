const express = require('express')
const router = express.Router()

router.get('/teste', (request, response)=>{
  return response.json({
    Mensagem: "Conectado com muito sucesso"
  })
})

module.exports = router;