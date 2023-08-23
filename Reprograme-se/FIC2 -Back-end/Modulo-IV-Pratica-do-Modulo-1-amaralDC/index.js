const express = require("express");
const hand = require("express-handlebars");
const app = express();
const porta = 3000;

app.set('view engine', 'html');
app.engine("handlebars", hand.engine());
app.set("view engine", "handlebars");

var route = require('./routes/route');
app.use(express.urlencoded({ extended: true }));
app.use('/', route);

app.listen(3000, () => {
  console.log('Server online.');
})