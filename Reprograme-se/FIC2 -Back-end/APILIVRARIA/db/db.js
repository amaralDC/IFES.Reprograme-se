const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './livraria.sqlite'
})

try {
  sequelize.authenticate();
  console.log("Conexão estabelecida ao banco de dados.");
} catch (erro) {
  console.log("Erro na conexão com o banco.", erro);
}

module.exports = sequelize;