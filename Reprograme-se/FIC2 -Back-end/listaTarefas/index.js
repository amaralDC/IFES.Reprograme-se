const database = require("./db/db");
const routes = require("./routes/routes");
const express = require("express");
const app = express();
//const usuarioController = require("./controller/usuarioController");
const Usuario = require("./model/usuarioModel");
const Tarefa = require("./model/tarefasModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

try {
  database.sync().then(() => {
  })
}
catch (erro) {
  console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};

app.use("/", routes);
app.listen(3000);