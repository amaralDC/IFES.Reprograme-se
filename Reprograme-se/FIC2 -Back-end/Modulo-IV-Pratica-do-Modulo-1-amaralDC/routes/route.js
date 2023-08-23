var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send("LISTA DE ESTADOS");
});

var estados = ['Espírito Santo', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais'];

// Formulário.
router.get("/estados", function(req, res) {
  res.render("form");
});

// Cadastro de estados.
router.post('/estados/cadastrar', (req, res) => {
  let nome = req.body.nome;
  estados[(estados.length)] = nome;
  return res.json([estados[(estados.length - 1)]]);
});

// Retorno de estados utilizando ID.
// 0 = Espírito Santo
// 1 = São Paulo
// 2 = Rio de Janeiro
// 3 = Minas Gerais
// 4+ = ...
router.get('/estados/:id', (req, res) => {
  let id = req.params.id;
  return res.json([estados[id]])
});

module.exports = router;