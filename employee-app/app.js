require('dotenv').config();

const express = require('express');
const app = express();

const pages = require('./routes/pageRoutes');

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use('/', pages);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Employee app running on http://${process.env.IP}:${process.env.PORT}`);
});
