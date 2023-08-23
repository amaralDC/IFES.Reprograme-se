const http = require('http')
const fs = require('fs')
const readline = require('readline');

const port = 443
const server = http.createServer((req, res) => {
  fs.readFile('pagina.html', (err, arquivo) => {
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.write(arquivo)
    res.end()
  })
})

async function readFileByLine(file) {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    console.log(line);
  }
}

readFileByLine('arquivo.txt')
server.listen(port, () => { console.log('Server online.') })