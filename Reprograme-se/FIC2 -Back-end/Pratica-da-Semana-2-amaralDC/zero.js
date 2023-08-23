const prompt = require('prompt-sync')();

const num1 = parseFloat(prompt('Digite o primeiro número: '));
const num2 = parseFloat(prompt('Digite o segundo número: '));

try {
  if (num2 === 0) {
    throw new Error('Erro! Dividir por zero é impossível.');
  }
  console.log(num1 / num2);
} catch (err) {
  console.error(err.message);
}