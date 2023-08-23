const express = require('express')

const app = express()
const port = 443
app.get('/', (req,res) => {
  //res.send('Hello world!')
  res.json('Hello world!')
})

app.listen(port, () => {
  console.log("Servidor online.")
})