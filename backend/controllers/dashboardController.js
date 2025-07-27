const db = require('../db');

exports.getDashboard = (req, res) => {
  let sql;
  let params = [];

  if (req.user.role === 'manager') {
    sql = `
      SELECT 
        COUNT(*) AS total,
        SUM(status = 'pending') AS pending,
        SUM(status = 'in-progress') AS inProgress,
        SUM(status = 'completed') AS completed
      FROM tasks
    `;
  } else {
    sql = `
      SELECT 
        COUNT(*) AS total,
        SUM(status = 'pending') AS pending,
        SUM(status = 'in-progress') AS inProgress,
        SUM(status = 'completed') AS completed
      FROM tasks
      WHERE userId = ?
    `;
    params.push(req.user.id);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const stats = results[0] || {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0
    };

    res.json(stats);
  });
};
