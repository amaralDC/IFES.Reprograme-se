const express = require('express');
const app = express();

app.get('/', (req,res) => {
  // return res.send('Hello world')
  return res.json({message: 'Hello world'});
})

app.listen(3000)