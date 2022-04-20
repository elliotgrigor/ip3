const { rotas } = require('./dbController.js');

exports.getAll = (req, res) => {
  rotas.find({}, (err, docs) => {
    if (err) return console.log(err);
    res.json(docs);
  });
};

exports.getByWeek = (req, res) => {
  rotas.findOne(
    { weekStart: req.params.weekStart },
    (err, doc) => {
      if (err) return console.log(err);
      res.json({ rota: doc });
    });
};
