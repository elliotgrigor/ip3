require('dotenv').config()

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://elliot:${process.env.MONGO_PASS}@cluster0.3kfaf.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
  );
}
