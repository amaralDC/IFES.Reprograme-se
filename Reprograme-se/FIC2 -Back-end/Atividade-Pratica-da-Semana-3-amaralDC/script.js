(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_lampadas')) ?? [];
}

function setLocalStorage(bd_lampadas) {
  localStorage.setItem('bd_lampadas', JSON.stringify(bd_lampadas));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() {
  limparTabela();
  const bd_lampadas = getLocalStorage();
  let index = 0;
  for (lampada of bd_lampadas) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${lampada.registro}</td>
        <td>${lampada.tipo}</td>
        <td>${lampada.formato}</td>
        <td>${lampada.potencia}</td>
        <td>${lampada.preco}</td>
        <td>${lampada.marca}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() {
  const lampada = {
    registro: document.getElementById('registro').value,
    tipo: document.getElementById('tipo').value,
    formato: document.getElementById('formato').value,
    potencia: document.getElementById('potencia').value,
    preco: document.getElementById('preco').value,
    marca: document.getElementById('marca').value
  }
  const bd_lampadas = getLocalStorage();
  bd_lampadas.push(lampada);
  setLocalStorage(bd_lampadas);
  atualizarTabela();
}

function excluir(index) {
  const bd_lampadas = getLocalStorage();
  bd_lampadas.splice(index, 1);
  setLocalStorage(bd_lampadas);
  atualizarTabela();
}

function validarRegistro() {
  const bd_lampadas = getLocalStorage();
  for (lampada of bd_lampadas) {
    if (registro.value == lampada.registro) {
      registro.setCustomValidity("Este número de registro já existe!");
      feedbackRegistro.innerText = "Este número de registro já existe!";
      return false;
    } else {
      registro.setCustomValidity("");
      feedbackRegistro.innerText = "Informe o registro corretamente.";
    }
  }
  return true;
}

atualizarTabela();

const registro = document.getElementById("registro");
const feedbackRegistro = document.getElementById("feedbackRegistro");
registro.addEventListener('input', validarRegistro);