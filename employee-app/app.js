require('dotenv').config();

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const SQLiteStore = require('@gristlabs/connect-sqlite3')(session);

const pages = require('./routes/pageRoutes');
const auth = require('./routes/authRoutes');
const { passportAuth } = require('./middleware/passport');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: process.env.SESSION_DB_PATH }),
}));
app.use(passport.authenticate('session'));

app.use('/', auth);
app.use(passportAuth);
app.use('/', pages);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Employee app running on http://${process.env.IP}:${process.env.PORT}`);
});
