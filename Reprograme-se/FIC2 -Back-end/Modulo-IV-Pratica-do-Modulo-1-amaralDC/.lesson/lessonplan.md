Códificação
----------------------------
Index.js
----------------------------

//BIBLIOTECAS E MÓDULOS
const express = require("express");
const app = express();
const hand = require("express-handlebars");
var route = require("./routes/route");  

//PORTA DO SERVIDOR
const porta = 3000;

//CONFIGURAÇÃO DO HANDLEBARS
app.set('view engine', 'html');
app.engine("handlebars", hand.engine());
app.set("view engine", "handlebars");

//CODIFICAÇÃO PARA ORGANIZAR HTML PARA JSON
app.use(express.urlencoded({ extended: true }));

//ROTA PRINCIPAL ENVIANDO PARA O ARQUIVO DE ROTAS
app.use("/",route);

//SERVIDOR  
app.listen(porta, () => {
  console.log("Exemplo de uso de rotas.");
});

----------------------------
pasta routes/route.js
----------------------------
//BIBLIOTECAS E MÓDULOS
var express = require("express");
var router = express.Router();

// ROTA PRINCIPAL
router.get('/', function(req, res) {
    res.send("Seja bem vindo a prática da semana 1");
});
// CRIANDO LISTA ESTADOS
var estados = [];

//ROTA POST PARA CADASTRAR ESTADOS NA LISTA
router.post('/estados/cadastrar', (req, res) => {
    let nome = req.body.nome;
    estados[(estados.length)] = nome;
    return res.json([estados[(estados.length - 1)]]);
});

//ROTA GET QUE CHAMA O FORMULÁRIO
router.get("/estados", function(req, res) {
  res.render("form");  
});

//EXPORTAR O ARQUIVO COMO MÓDULO PARA SER USADO NA APLICAÇÃO.
module.exports=router;

----------------------------
pasta views/layouts/main.handlebars
----------------------------
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     {{! BOOSTRAP 5 }}
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
{{!-- ARQUIVOS LOCAL --}}
<div class="container">
      {{{body}}}
    </div>
     </body>
</html>
    
----------------------------
pasta views/form.handlebars
----------------------------

<h1 class="text-center my-3">Cadastro de Estados</h1>
<form action="/estados/cadastrar" method="post">
  <div class="row w-50 d-block m-auto g-3">
    <div class="col-12">
      <label class="form-label" for="cidade">Nome do estado:</label>
      <input
        class="form-control"
        type="text"
        name="nome"
        id="nome"
        placeholder="Digite o nome do estado"
      />
    </div>
    
    <div>
      <input class="btn btn-primary my-3" type="submit" value="Cadastrar cidade" />
    </div>
  </div>
</form>