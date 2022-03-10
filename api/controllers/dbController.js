const Datastore = require('@seald-io/nedb');

const employees = new Datastore({ filename: '../db/employees.collection' });
const rotas = new Datastore({ filename: '../db/rotas.collection' });

exports.employees = employees;
exports.rotas = rotas;

exports.load = () => {
  employees.loadDatabase(err => {
    if (err) return console.log(err)
  });

  rotas.loadDatabase(err => {
    if (err) return console.log(err)
  });
}
