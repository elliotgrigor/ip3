const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DOMAIN}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
  );
}

exports.getAllEmployees = (req, res) => {
  res.json({ data: "employee_data" });
}
