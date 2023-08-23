const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const app = express()

const port = 443
app.get('/', (req, res) => {
  fs.readFile('home.html', (err, arquivo) => {
    // if (err) {
    //   console.error(err)
    //   return res.status(500).send('Erro!')
    // }
    res.write(arquivo)
    return res.end()
  })
})

app.post('/enviodearquivo', (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (erro, corpos, arquivos) => {
    const urlAntiga = arquivos.filetoupload.filepath
    const urlNova = './enviodearquivo/' + arquivos.filetoupload.originalFilename
    var rawData = fs.readFileSync(urlAntiga)
    fs.writeFile(urlNova, rawData, function(err){
      // if(err) {
      //   console.log(err)
      //   return res.status(500).send('Erro!')
      // }
      res.write('Arquivos enviados.')
      return res.end()
    })
  })
})

// O botão HTML deve listar os arquivos. Porém, caso não funcione, necessário acessar a URL:
// https://pratica-da-semana-3-amaraldc.rep-vila-velha1.repl.co/listar
app.get('/listar', (req, res) => {
  fs.readdir('./enviodearquivo', (err, arquivos) => {
    // if (err) {
    //   console.error(err)
    //   return res.status(500).send('Erro!')
    // }
    console.log(arquivos)
    res.write('Arquivos listados.')
    return res.end()
  })
})

app.listen(port, () => {console.log('Server online.')})
