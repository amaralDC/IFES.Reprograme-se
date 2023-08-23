const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = 443

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

app.listen(port, () => { console.log('Server online.') })