const Filme = require("../models/Filme");
module.exports = class FilmeController {
  static cadastrarFilme(req, res) {
    res.render("videos/Cadastrar");
  }
  static async FilmeCreate(req, res) {
    const filme = {
      categoria: req.body.categoria,
      titulo: req.body.titulo,
      genero: req.body.assunto,
      Link_sinopse: req.body.Link_sinopse
    }
    await Filme.create(filme);
    res.send("Cadastro realizado com sucesso!");
    res.redirect("/");
  }
  //LISTAR VIDEOS
  static async listarFilmes(req, res) {
    const filme = await Filme.findAll({ raw: true })
    res.render("videos/listar", { filme });
  }
  //UPDATE
  static async UpdateFilme(req, res) {
    const id_filme = req.params.id_filme;
    const filme = await Filme.findOne({ where: { id_filme: id_filme }, raw: true })
    res.render("videos/update", { filme })
  }
  static async FilmeUpdate(req, res) {
    const id_filme = req.body.id_filme
    const filme = {
      categoria: req.body.categoria,
      titulo: req.body.titulo,
      genero: req.body.assunto,
      Link_sinopse: req.body.Link_sinopse
    }
    await Filme.update(filme, { where: { id_filme: id_filme } })
    res.redirect("/")
  }
  //DELETE
  static async removerFilme(req, res) {
    const id_filme = req.body.id_filme;
    await Filme.destroy({ where: { id_filme: id_filme } })
    res.redirect("/")
  }
}