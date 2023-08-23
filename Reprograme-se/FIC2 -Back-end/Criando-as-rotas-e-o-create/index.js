const database = require('./db');
const Cliente = require('./models/cliente');
const express = require('express');
const app = express();
const port = 9443;
const bodyParser = require('body-parser');

(async () => {
  const clientes = await Cliente.findAll();
  console.log("Lista de Clientes \n",clientes);
  try {
    const resultado = await database.sync();
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
})();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
  res.send('Bem vindo ao cadastro de clientes.');
});

app.get("/cadcliente", function(req, res) {
  res.render('formCliente');
});

app.post('/addcliente', function(req, res) {
  Cliente.create({
    nome: req.body.nome,
    nascimento: req.body.nascimento,
    cidade: req.body.cidade,
    telefone: req.body.telefone
  }).then(function(){
    res.send("Cliente cadastrado com sucesso!")
  })
})

app.listen(port, () => { console.log('Server online.') });