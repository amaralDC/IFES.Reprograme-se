const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('empresa.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Conexão estabelecida.');
  // db.run("CREATE TABLE setor(idsetor int, nome varchar(40),ramal varchar(4), e_mail varchar(30))");
  // db.run("CREATE TABLE funcionario(matricula int primary key, id_setor int not null, nome varchar(40), nascimento date, telefone varchar(15))");
});

// db.run("INSERT INTO setor(idsetor,nome,ramal,e_mail) values (1, 'FINANCEIRO','4254','FINANCEIRO@EMPRESA.COM')");
// db.run("INSERT INTO setor(idsetor,nome,ramal,e_mail) values (2, 'PORTARIA','4253','PORTARIA@EMPRESA.COM')");
// db.run("INSERT INTO setor(idsetor,nome,ramal,e_mail) values (3, 'SECRETARIA','4257','SECRETARIA@EMPRESA.COM')");

// db.run("INSERT INTO FUNCIONARIO(matricula,id_setor,nome,nascimento,telefone) values(1234,1,'ANA','12-04-1978','01219219')");
// db.run("INSERT INTO FUNCIONARIO(matricula,id_setor,nome,nascimento,telefone) values(1235,2,'IVO','12-12-2000','01219218')");
// db.run("INSERT INTO FUNCIONARIO(matricula,id_setor,nome,nascimento,telefone) values(1236,3,'DAN','07-02-1987','01219217')");
// db.run("INSERT INTO FUNCIONARIO(matricula,id_setor,nome,nascimento,telefone) values(1237,3,'OTO','09-09-1990','01219216')");

db.each("select matricula, nome from funcionario", (err,row) => {
  if(err){
    console.error(err.message);
  }
  console.log(row.matricula + "\t" + row.nome);
});