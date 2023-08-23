const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const port = 443

app.get('/', (req, res) => {
  res.send('Enviando e-mail.')
})

app.get('/sendemail', async (req,res) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "15e326f0629497",
      pass: "7b8d8345e4a4a8"
    }
  })

  var message = {
  from: "sender@server.com",
  to: "receiver@sender.com",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>"
  }

transport.sendMail(message, (err) => {
  if(err)
    return res.status(400).json({
      erro: true,
      mensagem: 'Erro, e-mail cancelado.'
    })
  else
    return res.json({
      erro:false,
      mensagem: 'E-mail enviado.'
    })
  })
})
  
app.listen(port, () => {console.log('Server online.')})