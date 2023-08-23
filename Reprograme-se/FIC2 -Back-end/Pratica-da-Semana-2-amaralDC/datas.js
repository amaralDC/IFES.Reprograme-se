const prompt = require('prompt-sync')();

const meses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro"
];

const data = prompt("Digite uma data no formato DD/MM/AAAA: ");

const [dia, mes, ano] = data.split('/');

console.log(`${dia} de ${meses[mes - 1]} de ${ano}`);
