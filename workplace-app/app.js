require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const routes = require('./routes/pageRoutes');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'pug');
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'loggedIn',
  resave: false,
  saveUninitialized: false,
}));

app.use('/', routes);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Workplace app running on http://${process.env.IP}:${process.env.PORT}`);
});
