const fs = require('fs').promises;
const prompt = require('prompt-sync')();

async function listarCarros() {
  return new Promise((resolve, reject) => {
    fs.readFile('carros.json', 'utf8')
      .then(tempCarros => {
        const carro = JSON.parse(tempCarros || '{ "carros": [] }');
        console.log(carro.carros);
        resolve(carro.carros);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

async function cadastrarCarro() {
  return new Promise((resolve, reject) => {
    fs.readFile('carros.json', 'utf8')
      .then(tempCarros => {
        const carro = JSON.parse(tempCarros || '{ "carros": [] }');
        const placa = prompt('Digite a placa do carro: ');
        const nome = prompt('Digite o nome do carro: ');
        const montadora = prompt('Digite a montadora do carro: ');
        const novoCarro = {
          placa: placa,
          nome: nome,
          montadora: montadora
        };
        carro.carros.push(novoCarro);
        return fs.writeFile('carros.json', JSON.stringify(carro, null, 2));
      })
      .then(() => {
        //console.log('Carro cadastrado');
        resolve();
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

async function sistemaCarros() {
  console.log('\nSistema de cadastro de carros\n',
              '\n1. Listar carros',
              '\n2. Cadastrar novo carro',
              '\n3. Sair do sistema\n');
  const option = prompt('Digite a opção desejada: ');

  switch (option) {
    case '1':
      await listarCarros();
      break;
    case '2':
      await cadastrarCarro();
      break;
    case '3':
      return 0;
    default:
      console.log('Opção inválida.');
  }
  await sistemaCarros();
}

sistemaCarros();