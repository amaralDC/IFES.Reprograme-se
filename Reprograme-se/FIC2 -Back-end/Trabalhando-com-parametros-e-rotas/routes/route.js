var express = require('express');
var router = express.Router();

// ROTA PRINCIPAL
router.get('/', function(req, res) {
  res.send("Seja bem vindo a aula de rotas");
});

router.get('/clientes', function(req, res) {
  res.send("Lista todos os clientes");
});

router.get('/clientes/:nome/:sobrenome?', function(req, res) {
  res.send("Seja Bem Vindo <h1> " + req.params.nome + " " + req.params.sobrenome + "</h1>");
});

var cidades = ['Mimoso', 'Cachoeiro', 'Serra'];

router.get('/cidades/:id', (req, res) => {
  let id = req.params.id;
  return res.json([cidades[id]])
});

router.post('/cidades/cadastrar', (req, res) => {
  let nome = req.body.nome;
  cidades[(cidades.length)] = nome;
  return res.json([cidades[(cidades.length - 1)]]);
});

// ROTA principal cidade
router.get("/cidades", function(req, res) {
  res.render("form");
  //res.send("Seja bem vindo a rota de cidades");
});

//PARÂMETROS DE URL
router.get('/par', function(req, res) {
  let nome = req.query['nome'];
  if (nome) {
    res.send('<h1>' + nome + '</h1>');
  } else {
    res.send('Não foi localizado nenhum valor no navegador.');
  }
});

module.exports = router;