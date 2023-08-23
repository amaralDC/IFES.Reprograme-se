const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const nodemailer = require('nodemailer')

const app = express()
const port = 443

// Seção login

app.use(session({ secret: '1234567890' }))
app.use(bodyParser.urlencoded({ extended: true }))

var login = 'admin'
var pass = '1234'

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './'))

app.get('/', (req, res) => {
  if (req.session.login) {
    res.render('logged')
    console.log('Logado: ' + req.session.login)
  }
  else {
    res.render('home')
  }
})

app.post('/', (req, res) => {
  if (req.body.password == pass && req.body.login == login) {
    req.session.login = login
    res.render('logged')
  }
  else {
    res.render('home')
  }
})

// Seção e-mail

app.get('/email', (req, res) => {
  res.render("email")
})

app.get('/', (req, res) => {
  res.send('Enviando e-mail.')
})

app.get('/sendemail', (req, res) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      // amaralDC user: 15e326f0629497
      // Dionnes user: 2044f973c6a984
      user: "15e326f0629497",
      // amaralDC pass: 7b8d8345e4a4a8
      // Dionnes pass: a4e154605a67ae
      pass: "7b8d8345e4a4a8"
    }
  })

  var message = {
    from: "amaralDC@replit.com",
    to: "dionnes@mailtrap.io",
    subject: "Prática da Semana 4",
    text: "E-mail da atividade prática da semana 4. Bom dia!",
    html: "<p>E-mail da atividade prática da semana 4. Bom dia!</p>"
  }

  // A tela mostra erro de Cannot POST por 1 segundo, mas é falso positivo. O e-mail é mandado normalmente e aparece mensagem de e-mail enviado.
  transport.sendMail(message, (err) => {
    if (err)
      return res.status(400).json({
        erro: true,
        mensagem: 'Erro, e-mail cancelado.'
      })
    else
      return res.json({
        erro: false,
        mensagem: 'E-mail enviado.'
      })
  })
})

app.listen(port, () => { console.log('Server online.') })