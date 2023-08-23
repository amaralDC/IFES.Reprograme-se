const database = require('./db');
const Cliente = require('./models/cliente');
const Supplier = require('./models/fornecedor');
const express = require('express');
const app = express();
const port = 9443;
const bodyParser = require('body-parser');

(async () => {
  const clientes = await Cliente.findAll();
  const suppliers = await Supplier.findAll();
  console.log("Lista de clientes: \n",clientes);
  console.log("Lista de fornecedores: \n",suppliers);
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
  res.send('Bem vindo ao cadastro da empresa.');
});

app.get("/cadcliente", function(req, res) {
  res.render('formCliente');
});

app.get("/cadfornecedor", function(req, res) {
  res.render('formFornecedor');
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

app.post('/addfornecedor', function(req, res) {
  Supplier.create({
    nome: req.body.nome,
    telefone: req.body.telefone,
    email: req.body.email
  }).then(function(){
    res.send("Fornecedor cadastrado com sucesso!")
  })
})

app.listen(port, () => { console.log('Server online.') });