require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const routes = require('./routes/apiRoutes');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.3kfaf.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
  );
}

app.use('/api/v1', routes);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`API running on http://${process.env.IP}:${process.env.PORT}`);
});
