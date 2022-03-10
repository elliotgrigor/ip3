require('dotenv').config()

const express = require('express');
const app = express();

const db = require('./controllers/dbController');
db.load();

const routes = require('./routes/apiRoutes');
app.use('/api/v1', routes);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`API running on http://${process.env.IP}:${process.env.PORT}`);
});
