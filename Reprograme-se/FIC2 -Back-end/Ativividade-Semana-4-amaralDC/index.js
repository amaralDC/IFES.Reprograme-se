const prompt = require('prompt-sync')();

alturas = []

for (let i = 0; i <= 9; i++) {
  const height = {
    height: parseFloat(prompt(`Digite a altura: `))
  }
  alturas.push(height);
};

for (let i = 0; i < alturas.length; i++) {
  let num = 0;
  for (let j = 0; j < alturas.length; j++) {
    if (alturas[j]["height"] < alturas[i]["height"]) {
      num++;
    }
  }
  console.log(`Aluno ${i}: maior que ${num} aluno(s)`);
}
