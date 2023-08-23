const prompt = require('prompt-sync')();
var array_lampadas = [];

do {
  console.log("Sistema de Cadastro de Lampadas");
  console.log("1 - Inserir Lâmpada");
  console.log("2 - Excluir Lâmpada");
  console.log("3 - Listar Lâmpadas");
  console.log("0 - Sair");

  var opcao = prompt("Digite sua opção: ");

  if (opcao == 1) {
    console.log("\n\nInserindo Lâmpada...\n");
    let ID = parseInt(prompt("Digite o ID da lâmpada: "));
    let tipo = prompt("Digite o tipo da lâmpada: ");
    let cor = prompt("Digite a cor da lâmpada: ");
    let voltagem = prompt("Digite a voltagem da lâmpada: ");
    let marca = prompt("Digite a marca da lâmpada: ");

    const lampada = {
      ID: ID,
      tipo: tipo,
      cor: cor,
      voltagem: voltagem,
      marca: marca
    }

    inserir_lampada(lampada);

  } else if (opcao == 2) {
    console.log("\n\nExcluindo Lâmpada...\n");
    let ID = prompt("Digite o ID da lâmpada: ");
    excluir_lampada(ID);
  } else if (opcao == 3) {
    console.log("\n\nListando Lâmpadas...\n");
    listar_lampadas();
  } else {
    console.log("\n\nSaindo do programa...\n");
  }
  prompt("\nEnter para continuar...");
  console.clear();
} while (opcao != 0)

function inserir_lampada(lampada) {
  array_lampadas.push(lampada);
}

function excluir_lampada(ID) {
  // const index = array_lampadas.indexOf(ID);
  // console.log(ID);
  for (var i = 0; i < array_lampadas.length; i++) {
    if (array_lampadas[i]['ID'] == ID) {
      array_lampadas.splice(i, 1);
    }
  }
  /*var i = 0;
  while (i < array_lampadas.length){
    if (array_lampadas[i] === ID){
      arr.splice(i, 1);
    }else{
      ++i;
    }
  }*/
  /*if (index > -1){
    array_lampadas.splice(index, 1);
  }*/
}

function listar_lampadas() {
  array_lampadas.forEach(lampada => {
    console.log(`${lampada.ID}: ${lampada.tipo} - ${lampada.cor} - ${lampada.voltagem} - ${lampada.marca}`)
  })
}