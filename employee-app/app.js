require('dotenv').config();

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const SQLiteStore = require('@gristlabs/connect-sqlite3')(session);

const pages = require('./routes/pageRoutes');
const auth = require('./routes/authRoutes');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './db' }),
}));
app.use(passport.authenticate('session'));

app.use('/', pages);
app.use('/', auth);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Employee app running on http://${process.env.IP}:${process.env.PORT}`);
});