const express = require('express')

const app = express()
const port = 443
app.get('/contato', function(req,res){
  res.send('Hello world!')
})
app.get('/sobre', function(req,res){
  res.send('World hello!')
})
app.get('/', function(req,res){
  res.sendFile(__dirname + '/pagina.html')
})

app.listen(port, () => {
  console.log('Servidor online.')
})