const db = require('../db');

exports.getAllUsers = (req, res) => {
  db.query('SELECT id, name, email FROM users WHERE role = "user"', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getTasksByUserId = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM tasks WHERE userId = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
