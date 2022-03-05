require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./routes/pageRoutes');

app.set('view engine', 'pug');

app.use('/', routes);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Workplace app running on http://${process.env.IP}:${process.env.PORT}`);
});
