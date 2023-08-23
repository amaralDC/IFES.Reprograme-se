const express = require('express')
const rotas = require('./rotas')
const app = express()

const port = 443
app.use('/', rotas)
app.listen(port, () => {console.log('Server online.')})