const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = require("./db/db");
const Funcionario = require("./model/funcionarioModel");
const funcionarioController = require("./controller/funcionarioController");

//SINCRONISMO COM O BANCO DE DADOS
try {
  database.sync().then(() => {
  })
}
catch (erro) {
  console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};

app.get("/", (req, res) => {
  return res.json({ message: "Olá Mundo!" });
})

app.post("/Cadastrar", funcionarioController.FuncionarioCreate);
app.get("/Funcionarios",funcionarioController.FuncionarioListar);


app.listen(3000);