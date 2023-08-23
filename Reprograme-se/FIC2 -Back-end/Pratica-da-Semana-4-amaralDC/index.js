const prompt = require("prompt-sync")();
const axios = require('./api.js');

// IMPORTANTE!!! NO REPL.IT, PARA COMEÇAR O SERVIDOR!
// Digite no terminal: json-server --watch db.json

async function cadastrarTarefa() {
  var id = Number(prompt('Digite o ID da tarefa: '));
  var descricao = prompt('Digite a descrição da tarefa: ');

  try {
    await axios.api.post('/tarefas', {
      id: id,
      descricao: descricao,
      status: 'Pendente'
    });
    console.log('Tarefa cadastrada.');
  } catch (err) {
    console.log(err.message);
  }
}

async function alterarTarefa() {
  var id = Number(prompt('Digite o ID da tarefa: '));
  var descricao = prompt('Digite a descrição da tarefa: ');

  try {
    await axios.api.put(`/tarefas/${id}`, {
      id: id,
      descricao: descricao,
      status: 'Pendente'
    });
    console.log('Tarefa alterada.');
  } catch (err) {
    console.log(err.message);
  }
}

async function concluirTarefa() {
  var id = Number(prompt('Digite o ID da tarefa: '));
  var tarefa = await obterTarefa(id);

  async function obterTarefa(id) {
    var response = await axios.api.get(`/tarefas/${id}`);
    var tarefa = response.data;
    return tarefa;
  }

  try {
    await axios.api.put(`/tarefas/${id}`, {
      id: id,
      descricao: tarefa.descricao,
      status: 'Concluída'
    });
    console.log('Tarefa concluída.');
  } catch (err) {
    console.log(err.message);
  }
}

async function excluirTarefa() {
  var id = Number(prompt('Digite o ID da tarefa: '));

  try {
    await axios.api.delete(`/tarefas/${id}`);
    console.log('Tarefa excluída.');
  } catch (err) {
    console.log(err.message);
  }
}

async function listarPendentes() { 
  try {
    var response = await axios.api.get('/tarefas');
    var lista = response.data.filter((item) => item.status === 'Pendente');
    console.table(lista);
  } catch (err) {
    console.log(err.message);
  }
}

async function listarConcluidas() {
  try {
    var response = await axios.api.get('/tarefas');
    var lista = response.data.filter((item) => item.status === 'Concluída');
    console.table(lista);
  } catch (err) {
    console.log(err.message);
  }
}

// Menu
async function main() {
  console.log('\nSistema de gerenciamento de tarefas\n',
    '\n1. Cadastrar nova tarefa',
    '\n2. Alterar uma tarefa',
    '\n3. Marcar tarefa como concluída',
    '\n4. Excluir uma tarefa',
    '\n5. Listar tarefas pendentes',
    '\n6. Listar tarefas concluídas',
    '\n0. Sair do sistema\n');
  const option = prompt('Digite a opção desejada: ');

  switch (option) {
    case '1':
      await cadastrarTarefa();
      break;
    case '2':
      await alterarTarefa();
      break;
    case '3':
      await concluirTarefa();
      break;
    case '4':
      await excluirTarefa();
      break;
    case '5':
      await listarPendentes();
      break;
    case '6':
      await listarConcluidas();
      break;
    case '0':
      return 0; // Joewari da...
    default:
      console.log('Opção inválida.');
  }
  await main();
}

main();