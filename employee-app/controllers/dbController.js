const Datastore = require('@seald-io/nedb');

exports.employees = new Datastore({
  filename: '../db/employees.collection',
  autoload: true,
});

exports.rotas = new Datastore({
  filename: '../db/rotas.collection',
  autoload: true,
});
