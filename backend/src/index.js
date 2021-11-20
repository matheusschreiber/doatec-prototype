const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(router)
const porta = 8080
app.listen(porta, console.log(`Server rodando na porta ${porta}`))

