const Sequelize = require('sequelize');
const database = require('../db');
const Supplier = database.define('supplier', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefone:{
    type: Sequelize.STRING,
    allowNull:false
  },
  email:{
    type: Sequelize.STRING,
    allowNull:false
  }
})
module.exports = Supplier;