var cachorros = [{ "nome": "Thor", "imagem": "dog1" }, { "nome": "Zeca", "imagem": "dog2" }, { "nome": "Zeus", "imagem": "dog3" }, { "nome": "Pingo", "imagem": "dog4" }];

var gatos = [{ "nome": "Dunga", "imagem": "cat1" }, { "nome": "Mika", "imagem": "cat2" }, { "nome": "Conan", "imagem": "cat3" }, { "nome": "Messi", "imagem": "cat4" }];

const selectAnimals = document.getElementById("select_animals");
const container = document.getElementById("container");
const nome = document.getElementById("nome");

selectAnimals.addEventListener("input", listarAnimais);
container.addEventListener("mouseover", mostrarNome);
container.addEventListener("mouseout", limparNome);


function listarAnimais() {
  limparDivContainer();
  let animais = "";
  
  if (selectAnimals.value === "dog") {
    animais = cachorros;
  } else {
    animais = gatos;
  }

  for (imagem of animais){
    let img = document.createElement("img");
    img.setAttribute("src", "./img/" + imagem.imagem + ".jpg");
    img.setAttribute("id", imagem.nome);
    
    container.appendChild(img);
  }
}

function mostrarNome(e) {
  nome.innerText = e.target.id;
}

function limparNome() {
  p.innerText = "";
}

function limparDivContainer() {
  var elemento = document.querySelector("#container");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}