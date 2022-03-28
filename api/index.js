require('dotenv').config()

const express = require('express');
const app = express();

const routes = require('./routes/apiRoutes');
const { dataLoad } = require('./middleware/dataLoad');

app.use(dataLoad);
app.use('/api/v1', routes);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`API running on http://${process.env.IP}:${process.env.PORT}`);
});
