const http = require('http')
const url = require('url')

const port = 443
const server = http.createServer((req,res) => {
  res.writeHead(200, {'Content-type': 'text/html'})
  res.write(req.url)
  const param = url.parse(req.url,true).query
  res.write('<br/>'+param.nome) // ?nome=fulano
  res.write('<br/>'+param.sobrenome) // &sobrenome=de Tal
  res.write('<br/>'+param.cidade) // &cidade=Vila Velha
  res.end()
})

server.listen(port, () => {console.log('Server online.')})