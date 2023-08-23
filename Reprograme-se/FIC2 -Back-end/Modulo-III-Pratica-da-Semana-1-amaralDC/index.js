const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('escola.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Conexão estabelecida.');
  // db.run("CREATE TABLE aluno(matricula int primary key, nome varchar(60), email varchar(40), cidade varchar(60))");
});

// db.run("INSERT INTO aluno(matricula,nome,email,cidade) values(177,'Davi Ciríaco Amaral','davi02.amaral@gmail.com','Vila Velha')");
// db.run("INSERT INTO aluno(matricula,nome,email,cidade) values(790,'Fulano de Tal','fulano.tal@gmail.com','Cariacica')");
// db.run("INSERT INTO aluno(matricula,nome,email,cidade) values(825,'José Ninguém','zeninguem@gmail.com','Guarapari')");

db.each("select matricula, nome, email, cidade from aluno", (err,row) => {
  if(err){
    console.error(err.message);
  }
  console.log(row.matricula + "\t" + row.nome + "\t" + row.email + "\t" + row.cidade);
});