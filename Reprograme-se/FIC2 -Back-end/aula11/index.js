const http = require('http')
const formidable = require('formidable')
const fs = require('fs')

const port = 443
const server = http.createServer((req,res) => {
  if (req.url != '/enviodearquivo'){
  res.writeHead(200, {'Content-type': 'text/html'})
  res.write('<form action = "enviodearquivo" method = "post" enctype = "multipart/form-data">')
  res.write('<input type = "file" name = "filetoupload"><br>')
  res.write('<input type = "submit" value = "Enviar">')
  res.write('</form>')
  return res.end()    
  }else{
    const form = new formidable.IncomingForm()
    form.parse(req, (erro, corpos, arquivos) => {
      const urlAntiga = arquivos.filetoupload.filepath
      const urlNova = './enviodearquivo/' + arquivos.filetoupload.originalFilename
      var rawData = fs.readFileSync(urlAntiga)
      fs.writeFile(urlNova, rawData, function(err){
        if(err) console.log(err)
        res.write('Arquivos enviados.')
        res.end()
      })
    })
  }
})
server.listen(port, () => {console.log('Server online.')})