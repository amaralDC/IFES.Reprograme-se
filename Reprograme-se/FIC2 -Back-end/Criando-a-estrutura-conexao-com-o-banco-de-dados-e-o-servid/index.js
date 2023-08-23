//BIBLIOTECAS/MODULOS UTILIZADOS
const database = require("./db/db");
const express = require("express");
const app = express();
//SINCRONISMO COM O BANCO DE DADOS
try {
  database.sync().then(() => {
    app.listen(9443, () => { console.log('Server online.') });
  })
}
catch (erro) {
  console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};