const sqlite3 = require('sqlite3').verbose();
const {Sequelize, Model, DataTypes} = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "empresa.sqlite"
});

class Setor extends Model{
  static init(sequelize){
    super.init({
      idsetor:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome:{
        type: DataTypes.STRING(40),
        allowNull: false
      },
      ramal:{
        type: DataTypes.STRING(10),
        allowNull: false
      },
      email:{
        type: DataTypes.STRING(30)
      }
    }, {sequelize, modelname: 'setor', tableName: 'setores'})
  }
}

Setor.init(sequelize);

class Funcionario extends Model{
  static init(sequelize){
    super.init({
      matricula:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true        
      },
      idsetor:{
        type: DataTypes.INTEGER,
        references:{
          model: Setor,
          key: 'idsetor'}
        },
        nome:{
          type: DataTypes.STRING(60),
          allowNull: false,
        },
        nascimento:{
          type: DataTypes.DATE
        },
        telefone:{
          type: DataTypes.STRING(15)
        }
    }, {sequelize, modelName: 'funcionario', tableName: 'funcionarios'})
  }
}

Funcionario.init(sequelize);

// Sync
(async () => {
  await sequelize.sync({force: true});
  // CREATE
  const setor_create_F = await Setor.create({nome: "Financeiro", ramal: "2134", email: "financeiro@empresa.com"});
  const setor_create_S = await Setor.create({nome: "Secretaria", ramal: "2135", email: "secretaria@empresa.com"});
  const setor_create_P = await Setor.create({nome: "Portaria", ramal: "2136", email: "portaria@empresa.com"});
  const setor_create_C = await Setor.create({nome: "Contabilidade", ramal: "2137", email: "contabilidade@empresa.com"});
  const setor_create_D = await Setor.create({nome: "Diretoria", ramal: "2138", email: "diretoria@empresa.com"});
  const setor_create_R = await Setor.create({nome: "Recursos Humanos", ramal: "2139", email: "recursoshumanos@empresa.com"});

  // DELETE
  const setor_delete = await Setor.findByPk(4);
  setor_delete.destroy();

  // UPDATE
  const setor_chave = await Setor.findByPk(6);
  setor_chave.nome = "Departamento Pessoal";
  const resultado = await setor_chave.save();
  console.log(resultado);

  // READ
  const setores_listar = await Setor.findAll();
  console.log("Lista de setores: \n", JSON.stringify(setores_listar,null,2),"\n\n");

})();