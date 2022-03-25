const { rotas } = require('./dbController.js');

exports.getByWeek = (req, res) => {
  rotas.findOne(
    { weekStart: req.params.weekStart },
    (err, doc) => {
      if (err) return console.log(err);
      res.json({ rota: doc });
    });
}