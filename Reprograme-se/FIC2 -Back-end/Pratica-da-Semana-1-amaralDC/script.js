const readline = require('readline-sync');

let alunos = [];

//for (let i = 1; i <= 3; i++) {
for (let i = 1; i <= 10; i++) {
  const nome = readline.question(`Nome do aluno: `);
  const nota = Number(readline.question(`Nota: `));
  alunos.push({ nome, nota });
}
//console.log(alunos);

let maiorNota = 0;
let nomeMaiorNota = '';
for (let i = 0; i < alunos.length; i++) {
  if (alunos[i].nota > maiorNota) {
    maiorNota = alunos[i].nota;
    nomeMaiorNota = alunos[i].nome;
  }
}
console.log(`Maior nota: ${maiorNota}, aluno: ${nomeMaiorNota}`);

let menorNota = 101;
let nomeMenorNota = '';
for (let i = 0; i < alunos.length; i++) {
  if (alunos[i].nota < menorNota) {
    menorNota = alunos[i].nota;
    nomeMenorNota = alunos[i].nome;
  }
}
console.log(`Menor nota: ${menorNota}, aluno: ${nomeMenorNota}`);

let somaNotas = 0;
for (let i = 0; i < alunos.length; i++) {
  somaNotas += alunos[i].nota;
}
const mediaNotas = somaNotas / alunos.length;
console.log(`Média de notas: ${mediaNotas}`);

let aprovados = 0;
for (let i = 0; i < alunos.length; i++) {
  if (alunos[i].nota >= 60) {
    aprovados++;
  }
}
console.log(`Quantidade de alunos aprovados: ${aprovados}`);

const reprovados = alunos.length - aprovados;
console.log(`Quantidade de alunos reprovados: ${reprovados}`);