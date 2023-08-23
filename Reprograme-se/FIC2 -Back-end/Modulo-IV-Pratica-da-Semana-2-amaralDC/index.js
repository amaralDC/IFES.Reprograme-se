// POSTMAN: https://www.postman.com/amaraldc/workspace/api-teste/collection/27736385-60e3cf3a-630f-42a4-8a47-837598fa6da0

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = require("./db/db");
const Funcionario = require("./model/funcionarioModel");
const funcionarioController = require("./controller/funcionarioController");
const Cliente = require("./model/clienteModel");
const clienteController = require("./controller/clienteController");

//SINCRONISMO COM O BANCO DE DADOS
try {
  database.sync().then(() => {
  })
}
catch (erro) {
  console.log("Falha no sincronismo com o banco de dados. Erro: ", erro);
};

app.get("/", (req, res) => {
  return res.json({ message: "Olá Mundo!" });
})

// Funcionário
app.post("/Cadastrar/Funcionario", funcionarioController.FuncionarioCreate);
app.get("/Funcionarios",funcionarioController.FuncionarioListar);
app.put("/Funcionarios/:id",funcionarioController.FuncionarioUpdate);
app.delete("/Funcionarios/:id",funcionarioController.FuncionarioDelete);
// Cliente
app.post("/Cadastrar/Cliente", clienteController.ClienteCreate);
app.get("/Clientes",clienteController.ClienteListar);
app.put("/Clientes/:id",clienteController.ClienteUpdate);
app.delete("/Clientes/:id",clienteController.ClienteDelete);

app.listen(3000);