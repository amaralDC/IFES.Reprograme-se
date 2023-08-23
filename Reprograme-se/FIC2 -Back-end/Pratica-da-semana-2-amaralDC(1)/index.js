const express = require('express')
const path = require('path');
const fs = require('fs');

const app = express()
const port = 443


app.get('/p1.html', (req,res) => {
  const filePath = path.join(__dirname, '/p1.html');
  fs.readFile(filePath, 'utf8', (err, html) => {
    res.send(html)
  })
})

app.get('/p2.html', (req,res) => {
  const filePath = path.join(__dirname, '/p2.html');
  fs.readFile(filePath, 'utf8', (err, html) => {
    res.send(html)
  })
})

app.get('/p3.html', (req,res) => {
  const filePath = path.join(__dirname, '/p3.html');
  fs.readFile(filePath, 'utf8', (err, html) => {
    res.send(html)
  })
})

app.get('/', (req,res) => {
  const filePath = path.join(__dirname, '/home.html');
  fs.readFile(filePath, 'utf8', (err, html) => {
    res.send(html)
  })
})


app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log('Servidor online.')
})