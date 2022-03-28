const { employees, rotas } = require('../controllers/dbController.js');

exports.dataLoad = (req, res, next) => {
  employees.loadDatabase();
  rotas.loadDatabase();
  return next();
}
