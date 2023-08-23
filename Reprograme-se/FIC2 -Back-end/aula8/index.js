const http = require('http')

const port = 443
const server = http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  if (req.url == '/'){
    res.write('<h1>Hello world!</h1>')
  } else if (req.url == '/server'){
    res.write('<h1>Hello server!</h1>')
  } else if (req.url == '/server/node'){
    res.write('<h1>Hello node!</h1>')
  } else {
    res.write('<h1>404</h1>')
  }
  res.end()
})

server.listen(port, () => {
  console.log('Servidor online.')
})