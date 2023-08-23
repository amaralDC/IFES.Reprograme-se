const express = require('express')
const rotas = express.Router()

let municipios = [
  {'cidade': 'vitoria', 'info': 'Capital do ES'},
  {'cidade': 'vilavelha', 'info': 'Canela Verde'},
  {'cidade': 'cachoeiro', 'info': 'Princesa do Sul'},
  {'cidade': 'colatina', 'info': 'Princesa do Norte'}
]

rotas.get('/', (req,res) => {
  res.json({Olá: 'Seja bem-vindo!'})
})

rotas.get('/:cidadeid', (req,res) => {
  const cidade = req.params.cidadeid
  const cidadeinfo = municipios.find(i => i.cidade == cidade)

  if (!cidadeinfo){
    res.status(404).json(
      {erro: 'Cidade nao encontrada.', cidadepesquisada: cidade}
    )
  } else {
    res.status(200).json(cidadeinfo)
  }
})
module.exports = rotas