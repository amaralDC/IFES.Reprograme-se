const fs = require('fs');

const pessoasArray = JSON.parse(fs.readFileSync('pessoas.json', 'utf8'));
console.log(pessoasArray.pessoas);