const prompt = require("prompt-sync")();

const placa = prompt("Digite a placa do veículo (formato AAA-1234): ");

if (!/^[A-Za-z]{3}\-\d{4}$/.test(placa)) {
  console.error("Placa inválida, favor utilizar o formato AAA-1234.");
  process.exit(1);
}

const placaFinal = Number(placa.slice(-1));
const data = new Date();
//console.log(data);
let dia = data.getDay();
dia = dia - 1;
//console.log(dia);

if (dia >= 1 && dia <= 5) {
  switch (dia) {
    case 1: //Segunda
      if (placaFinal === 1 || placaFinal === 2) {
        console.log("O veículo NÃO pode circular hoje.");
      } else {
        console.log("O veículo pode circular hoje.");
      }
      break;
    case 2: //Terça
      if (placaFinal === 3 || placaFinal === 4) {
        console.log("O veículo NÃO pode circular hoje.");
      } else {
        console.log("O veículo pode circular hoje.");
      }
      break;
    case 3: //Quarta
      if (placaFinal === 5 || placaFinal === 6) {
        console.log("O veículo NÃO pode circular hoje.");
      } else {
        console.log("O veículo pode circular hoje.");
      }
      break;
    case 4: //Quinta
      if (placaFinal === 7 || placaFinal === 8) {
        console.log("O veículo NÃO pode circular hoje.");
      } else {
        console.log("O veículo pode circular hoje.");
      }
      break;
    case 5: //Sexta
      if (placaFinal === 9 || placaFinal === 0) {
        console.log("O veículo NÃO pode circular hoje.");
      } else {
        console.log("O veículo pode circular hoje.");
      }
      break;
  }
} else { //Sábado e Domingo
  console.log("O veículo pode circular hoje.")
}