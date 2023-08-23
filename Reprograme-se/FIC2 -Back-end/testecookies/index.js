const express = require('express');
const app = express();

var cookie = require('cookie-parser');
app.use(cookie());

let user1 = {
  nome: "Bernardo",
  apelido: "Ben 10",
  idade: "10",
  cidade: "Vitória"
}

let user2 = {
  nome: "Alexandre",
  apelido: "Alexa",
  idade: "19",
  cidade: "Cachoeiro de Itapemirim"
}

let user3 = {
  nome: "Ana",
  apelido: "Aninha",
  idade: "22",
  cidade: "Vila Velha"
}

app.get('/adicionarCookie', (req, res) => {
  res.cookie("usuarioDados1", user1, { expire: 60000 + Date.now() });
  // res.cookie("usuarioDados2", user2, { expire: 60000 + Date.now() });
  // res.cookie("usuarioDados3", user3, { expire: 60000 + Date.now() });
  res.send('Dados do usuário adicionado com sucesso!');
});

app.get('/mostrarCookies', (req, res) => {
  res.send(req.cookies);
  //res.send(req.cookies.usuarioDados1);
  //res.send(req.cookies.usuarioDados1.nome);
});

app.get('/', (req, res) => {
  res.send('Seja bem-vindo ao teste de cookies.');
});

app.get('/logout', (req, res) => {
  res.clearCookie("usuarioDados1");
  res.send('Usuário desconectado com sucesso!');
});

app.listen(3000);