API LIVRARIA

index.js

//INSTALAÇÃO BIBLIOTECAS/MÓDULOS
const express = require("express");
const app = express();
const database = require("./db/db");
const routes = require("./routes/routes");
const jwt = require("jsonwebtoken");
//MODELS


//CODIFICAÇÃO JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//ROTA PRINCIPAL
app.use("/",routes);

try {
database.sync().then(() => {
})
}
catch(erro) {
console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};

app.listen(3000);



pasta controller

funcionarioController.js

const Funcionario = require("../model/funcionarioModel");
const jwt = require("jsonwebtoken");
module.exports = class funcionarioController{
//CREATE
static async funcionarioCreate(req,res){
let nome = req.body.nome;
let email = req.body.email;
let senha = req.body.senha;

const funcionario = {
nome: nome,
email: email,
senha: senha
}
await Funcionario.create(funcionario);
res.json({message: "Funcionario cadastrado com sucesso!"});
}
//READ - LISTAR
static async FuncionarioListar(req,res){
const id_funcionario = req.params.id;
if(id_funcionario){
const funcionario = await Funcionario.findOne({where: {id_funcionario: id_funcionario}});
res.json(funcionario);
}else{
const funcionario = await Funcionario.findAll({raw:true});
res.json(funcionario);
}
}
//UPDATE
static async FuncionarioUpdate(req, res){
const id_funcionario = req.params.id;
let nome = req.body.nome;
let email = req.body.email;
let senha = req.body.senha;
const funcionario = {
nome: nome,
email: email,
senha: senha
};
await Funcionario.update(funcionario,{where: {id_funcionario:id_funcionario}});
res.json({message: "Cadastro atualizado com sucesso! Foram atualizados as sequintes informações: ", dados: funcionario});
}
//Função FuncionarioDelete responsável pela exclusão do usuário.
static async FuncionarioDelete(req,res){
const id_funcionario = req.params.id;
await Funcionario.destroy({where:{id_funcionario: id_funcionario}});

res.json({message: "Funcionário excluído com sucesso!"});
}


static async FuncionarioVerificaLogin(req,res){
var email = req.body.email;
var senha = req.body.senha;
const dados={
email: email,
senha: senha
};
const funcionario = await Funcionario.findOne({where: {email: email, senha: senha}}).then((funcionario)=>{
if(funcionario!= undefined){
const id = funcionario.id_funcionario;
const token = jwt.sign({ id }, process.env.SECRET, {
expiresIn: 300 // expira em 5min
});
return res.json({ auth: true, token: token }); //Criação do token
}else{
res.status(402).json({message: "Erro ao logar no sistema"});
}
})
}
// VERIFICA SE O TOKEN FOI CRIADO
static async verificaJWT(req, res, next){
const token = req.headers['x-access-token'];
if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token criado.' });
jwt.verify(token, process.env.SECRET, function(err, decoded) {
if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação com o token.' });

// Salva no request para uso posterior
req.userId = decoded.id;
next();
});
}

}

livroController.js

const Livro = require("../model/livroModel");

module.exports = class livroController{
//CREATE
static async livroCreate(req,res){
let titulo = req.body.titulo;
let autor = req.body.autor;
let preco = req.body.preco;
let link = req.body.link;
const livro = {
titulo: titulo,
autor: autor,
preco: preco,
link: link
}
await Livro.create(livro);
res.json({message: "Livro cadastrado com sucesso!"});
}
//READ - LISTAR
static async LivroListar(req,res){
const id_livro = req.params.id;
if(id_livro){
const livro = await Livro.findOne({where: {id_livro: id_livro}});
res.json(livro);
}else{
const livro = await Livro.findAll({raw:true});
res.json(livro);
}
}
//UPDATE
static async LivroUpdate(req, res){
const id_livro = req.params.id;
let titulo = req.body.titulo;
let autor = req.body.autor;
let preco = req.body.preco;
let link = req.body.link;
const livro = {
titulo: titulo,
autor: autor,
preco: preco,
link: link
};
await Livro.update(livro,{where: {id_livro:id_livro}});
res.json({message: "Cadastro atualizado com sucesso! Foram atualizados as sequintes informações: ", dados: livro});
}
//Função LivroDelete responsável pela exclusão do usuário.
static async LivroDelete(req,res){
const id_livro = req.params.id;
await Livro.destroy({where:{id_livro: id_livro}});

res.json({message: "Livro excluído com sucesso!"});
}
}

pasta db

db.js

// BIBLIOTECAS/MODULOS UTILIZADOS
const Sequelize = require('sequelize');
//CRIANDO A CONFIGURAÇÃO DO BANCO DE DADOS
const sequelize = new Sequelize({
dialect: 'sqlite',
storage: './livraria.sqlite'
})
//TRATANDO POSSÍVEIS ERROS E AUTENTICANDO NO BANCO
try {
sequelize.authenticate();
console.log("Banco de dados conectado com sucesso!");
}
catch (erro) {
console.log("Erro ao conectar ao banco",erro);
}
module.exports = sequelize;



pasta model

funcionarioModel.js

const Sequelize = require('sequelize');
const database = require('../db/db');

const Funcionario = database.define('funcionario', {
id_funcionario: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
nome:{
type: Sequelize.STRING,
allowNull: false,
},
email:{
type: Sequelize.STRING,
allowNull: false,
},
senha:{
type: Sequelize.STRING,
allowNull:false
}
}, {database,modelname:'funcionario',tableName: 'funcionarios'})
module.exports = Funcionario;

livroModel.js

const Sequelize = require('sequelize');
const database = require('../db/db');

const Livro = database.define('livro', {
id_livro: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
titulo:{
type: Sequelize.STRING,
allowNull: false,
},
autor:{
type: Sequelize.STRING,
allowNull: false,
},
preco:{
type: Sequelize.STRING,
allowNull:false
},
link:{
type: Sequelize.STRING,
allowNull:false
}
}, {database,modelname:'livro',tableName: 'livros'})
module.exports = Livro;



pasta routes

routes.js

////////////////MÓDULOS /////////////////////
const express = require("express");
const router = express.Router();
//////CONTROLLERS
const funcionarioController = require("../controller/funcionarioController");
const livroController = require("../controller/livroController");
////////////////Requisições HTTP Principal /////////////////////
router.get("/",(req, res) =>{
return res.json({message: "Sistema de Livraria"});
})
////////////////Requisições HTTP Usuario /////////////////////

//POST - CADASTRAR
router.post("/add_funcionario", funcionarioController.funcionarioCreate);

//GET - LISTAR
router.get("/funcionarios/:id?", funcionarioController.verificaJWT,funcionarioController.FuncionarioListar);

//PUT - UPDATE
router.put("/funcionarios/:id", funcionarioController.FuncionarioUpdate);

// DELETE
router.delete("/funcionarios/:id", funcionarioController.FuncionarioDelete);

router.post("/login", funcionarioController.FuncionarioVerificaLogin);



/////////////Requisições Livro

//POST - CADASTRAR
router.post("/add_livros", livroController.livroCreate);

//GET - LISTAR
router.get("/livros/:id?", livroController.LivroListar);

module.exports = router;



FRONT LIVRARIA

index.js

////////////////MÓDULOS /////////////////////
const express = require("express");
const router = express.Router();
//////CONTROLLERS
const funcionarioController = require("../controller/funcionarioController");
const livroController = require("../controller/livroController");
////////////////Requisições HTTP Principal /////////////////////
router.get("/",(req, res) =>{
return res.json({message: "Sistema de Livraria"});
})
////////////////Requisições HTTP Usuario /////////////////////

//POST - CADASTRAR
router.post("/add_funcionario", funcionarioController.funcionarioCreate);

//GET - LISTAR
router.get("/funcionarios/:id?", funcionarioController.verificaJWT,funcionarioController.FuncionarioListar);

//PUT - UPDATE
router.put("/funcionarios/:id", funcionarioController.FuncionarioUpdate);

// DELETE
router.delete("/funcionarios/:id", funcionarioController.FuncionarioDelete);

router.post("/login", funcionarioController.FuncionarioVerificaLogin);



/////////////Requisições Livro

//POST - CADASTRAR
router.post("/add_livros", livroController.livroCreate);

//GET - LISTAR
router.get("/livros/:id?", livroController.LivroListar);

module.exports = router;



pasta routes

routes.js

const express = require("express");
const Services = require("../services/services");
const router = express.Router();
/*
router.get("/",(req, res) =>{
res.send("Seja bem Vindo ao nosso sistema de Varejo Virtual.");
});
*/
router.get("/",Services.LivroListar);

router.post("/login",Services.FuncionarioLogin);

router.get("/login",(req, res) =>{
res.render("funcionarios/login");
})

router.post("/login", Services.FuncionarioLogin)

router.get("/funcionarios/Cadastrar",(req, res) =>{
res.render("funcionarios/Cadastrar");
})

router.post("/funcionarios/Cadastrar",Services.FuncionarioCreate);

router.get("/livros/Cadastrar",(req, res) =>{
res.render("livros/Cadastrar");
})
router.post("/livros/Cadastrar",Services.LivroCreate);

router.get("/livros/listar",Services.LivroListar);

router.get("/carrinho/Adicionar/:titulo/:autor/:preco/:link",(req, res) =>{
res.render("livros/carrinho");
})

module.exports=router;



pasta services

services.js

const axios = require("axios");
var session = require('express-session');
module.exports = class Services{
//VERIFICAR FUNCIONARIO
static async FuncionarioLogin(req,res){

let valores = req.body;
const options = {
url: 'https://apilivraria.antonioizo.repl.co/login',
method: 'POST',
data: valores
};
await axios(options).then((funcionario) => {
if(funcionario != undefined){
return res.render('logado');
}

})
}

//Create usuário
static async FuncionarioCreate(req,res){
let valores = req.body;
const options = {
url: 'https://apilivraria.antonioizo.repl.co/add_funcionario',
method: 'POST',
data: valores
};
axios(options);
const mensagem = "Cadastro realizado com sucesso!";
res.render("mensagem",{mensagem});
}


//Create produto
static async LivroCreate(req,res){
let valores = req.body;
const options = {
url: 'https://apilivraria.antonioizo.repl.co/add_livros',
method: 'POST',
data: valores
};
axios(options);
const mensagem = "Cadastro realizado com sucesso!";
res.render("mensagem",{mensagem});
}

//LISTAR
static async LivroListar(req,res){
const options = {
url: 'https://apilivraria.antonioizo.repl.co/livros',
method: 'GET',
data: {}
};
axios(options).then(response => {
console.log(response.data);
const livro =response.data

res.render("livros/listar",{livro});
});
}

}

pasta views

logado.handlebars

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
<title>Seja bem vindo ao sistema de Livrarias </title>
</head>
<body>
<h1>Seja bem vindo! ao sistema de Livrarias</h1><br>

<a href="livros/listar">Listar livros</a><br>
<a href="funcionarios/Cadastrar">Cadastrar Funcionarios</a><br>
<a href="livros/Cadastrar">Cadastrar Livros</a><br>

</body>
</html>



mensagem.handlebars

<h4>{{mensagem}}</h4>



pasta views/layouts

main.handlebars

<html lang="pt-br">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
{{! BOOSTRAP 5 }}
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
{{!-- ARQUIVOS LOCAL --}}
<link rel="stylesheet" href="css/styles.css" />
<title>Sistema de Livaria</title>
</head>
<body id="body-mobile">
<nav class="navbar text-bg-dark">
<div class="container">
<span class="navbar-brand text-white">Sistema de Livraria</span>
<ul class="navbar nav">
<li class="nav-item">
</li>
</ul>
</div>
</nav>
<div class="container">
{{{body}}}
</div>
</body>
</html>



pasta livros

Cadastrar.handlebars

<h1 class="text-center my-3">Sistema de Cadastro de Livros</h1>
<form action="/livros/Cadastrar" method="post">
<div class="row w-50 d-block m-auto g-3">
<div class="col-12">
<label class="form-label" for="titulo">Título do Livro:</label>
<input
class="form-control"
type="text"
name="titulo"
id="titulo"
placeholder="Digite o titulo do livro."
/>
</div>
<div class="col-12">
<label class="form-label" for="autor">Autor do livro:</label>
<input
class="form-control"
type="text"
name="autor"
id="autor"
placeholder="Digite o autor do livro."
/>
</div>
<div class="col-12">
<label class="form-label" for="preco">Preço do livro:</label>
<input
class="form-control"
type="text"
name="preco"
id="preco"
placeholder="Digite o preço do livro."
/>
</div>
<div class="col-12">
<label class="form-label" for="link">Link da imagem do livro:</label>
<input
class="form-control"
type="text"
name="link"
id="link"
placeholder="Digite o link da imagem do livro."
/>
</div>
<div>
<input class="btn btn-primary my-3" type="submit" value="Cadastrar Livro" />
</div>
</div>
</form>

listar.handlebars

<h1 class="text-center my-3">Lista de Livros</h1>
<table class="table">
<div class="row">
<div class="col-12">
<thead>
</thead>
<tbody>

<tr>
{{#each livro}}
<th><center><img src="{{this.link}}" alt="mostrar imagem" width=150 height=150><br>
<strong>{{this.titulo}}</strong><br>

{{this.autor}} <br>
R${{this.preco}} <br>
cod. Produto:{{this.id_livro}}<br>

<a href="/carrinho/Adicionar/{{this.titulo}}/{{this.autor}}/{{this.preco}}/{{this.id_livro}}"><img src="https://pt.seaicons.com/wp-content/uploads/2015/06/Shopping-basket-add-icon.png" width=20 height=20 alt="mostrar imagem" /></a>
</th>
<form class="borde-0 m-0" action="/carrinho/Adicionar" method="POST">
<input type="hidden" name="id_livro" value={{this.id_livro}}>
</form>
{{/each}}
</tr>

</tbody>
</div>
</div>
</table>



pasta views/funcionarios

Cadastrar.handlebars

<h1 class="text-center my-3">Sistema de Cadastro de Funcionários</h1>
<form action="/funcionarios/Cadastrar" method="post">
<div class="row w-50 d-block m-auto g-3">
<div class="col-12">
<label class="form-label" for="nome">Nome:</label>
<input
class="form-control"
type="text"
name="nome"
id="nome"
placeholder="Digite o seu Nome"
/>
</div>
<div class="col-12">
<label class="form-label" for="email">Email:</label>
<input
class="form-control"
type="text"
name="email"
id="email"
placeholder="Digite o seu Email"
/>
</div>
<div class="col-12">
<label class="form-label" for="senha">Senha:</label>
<input
class="form-control"
type="password"
name="senha"
id="senha"
placeholder="Digite a sua senha"
/>
</div>
<div>
<input class="btn btn-primary my-3" type="submit" value="Cadastrar Funcionário" />
</div>
</div>
</form>

login.handlebars

<h1 class="text-center my-3">Login</h1>
<form action="/login" method="post">
<div class="row w-50 d-block m-auto g-3">
<div class="col-12">
<label class="form-label" for="email">email:</label>
<input
class="form-control"
type="text"
name="email"
id="email"
placeholder="Digite o seu email cadastrado"
/>
</div>
<div class="col-12">
<label class="form-label" for="senha">Senha:</label>
<input
class="form-control"
type="password"
name="senha"
id="senha"
placeholder="Digite a sua senha"
/>
</div>
<div class="col-12">
<a href="/funcionarios/Cadastrar">Caso não seja cadastrado clique aqui<i class="bi bi-pencil-square"></i></a></div>
<div>
<input class="btn btn-primary my-3" type="submit" value="Acessar" />
</div>
</div>
</form>

