const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(
    'mongodb+srv://elliot:iwFgHWnq60MzXwUT@cluster0.3kfaf.azure.mongodb.net/work_management_dev?retryWrites=true&w=majority',
    { useNewUrlParser: true },
  );
}
