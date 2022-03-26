const Datastore = require('@seald-io/nedb');

exports.employees = new Datastore({
  filename: process.env.EMPLOYEE_DB,
  autoload: true,
});

exports.rotas = new Datastore({
  filename: process.env.ROTA_DB,
  autoload: true,
});
