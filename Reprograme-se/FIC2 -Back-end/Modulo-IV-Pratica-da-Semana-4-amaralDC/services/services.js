const axios = require("axios");

module.exports = class Services {
  //VERIFICAR USUÁRIO
  static async FuncionarioLogin(req, res) {
    let valores = req.body;
    const options = {
      url: 'https://apilivraria.amaraldc.repl.co/login',
      method: 'POST',
      data: valores
    };
    axios(options).then((usuario) => {
      if (usuario != undefined) {
        return res.render('logado');
      }
    })
  }
  //Create usuário
  static async FuncionarioCreate(req, res) {
    let valores = req.body;
    const options = {
      url: 'https://apilivraria.amaraldc.repl.co/add_usuario',
      method: 'POST',
      data: valores
    };
    axios(options);
    const mensagem = "Cadastro realizado com sucesso!";
    res.render("mensagem", { mensagem });
  }
  //Create livro
  static async LivroCreate(req, res) {
    let valores = req.body;
    const options = {
      url: 'https://apilivraria.amaraldc.repl.co/add_livros',
      method: 'POST',
      data: valores
    };
    axios(options);
    const mensagem = "Cadastro realizado com sucesso!";
    res.render("mensagem", { mensagem });
  }
  //LISTAR
  static async LivroListar(req, res) {
    const options = {
      url: 'https://apilivraria.amaraldc.repl.co/livros',
      method: 'GET',
      data: {}
    };
    axios(options).then(response => {
      console.log(response.data);
      const livro = response.data
      res.render("livros/listar", { livro });
    });
  }
}