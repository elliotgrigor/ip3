const { employees, rotas } = require('../controllers/dbController');

exports.loadDb = (req, res, next) => {
  employees.loadDatabase();
  rotas.loadDatabase();
  return next();
};
