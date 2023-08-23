const precos = document.querySelectorAll('.produto_preco');
var resultado = 0;

for (var i = 0; i < precos.length; i++) {
  //var resultado = 0;
  resultado += parseFloat(precos[i].innerText);
}

document.write("Total: R$ ", resultado);
