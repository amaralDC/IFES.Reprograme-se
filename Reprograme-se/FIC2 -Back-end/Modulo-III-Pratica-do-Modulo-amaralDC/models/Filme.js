const Sequelize = require('sequelize');
const database = require('../db/db');
const Filme = database.define('video', {
  id_filme: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Link_sinopse: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { database, modelname: 'filme', tableName: 'filmes' })
module.exports = Filme;