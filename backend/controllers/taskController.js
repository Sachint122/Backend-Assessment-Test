const db = require('../db');

exports.createTask = (req, res) => {
  const { title, description, status = 'pending' } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const query = 'INSERT INTO tasks (userId, title, description, status) VALUES (?, ?, ?, ?)';
  db.query(query, [req.user.id, title, description, status], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  });
};

exports.getTasks = (req, res) => {
  const { status, search, sort = 'createdAt:desc', page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const [sortField, sortOrder] = sort.split(':');

  let query = 'SELECT tasks.*, users.name AS userName FROM tasks JOIN users ON tasks.userId = users.id WHERE ';
  const params = [];

  if (req.user.role !== 'manager') {
    query += 'userId = ?';
    params.push(req.user.id);
  } else {
    query += '1=1';
  }

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (search) {
    query += ' AND (tasks.title LIKE ? OR tasks.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ` ORDER BY ${sortField} ${sortOrder.toUpperCase()} LIMIT ? OFFSET ?`;
  params.push(parseInt(limit), parseInt(offset));

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ tasks: results });
  });
};


exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const baseQuery = `
    UPDATE tasks SET 
      title = ?, 
      description = ?, 
      status = ?, 
      updatedAt = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;

  const params = [title, description, status, id];

  if (req.user.role !== 'manager') {
    query = baseQuery + ' AND userId = ?';
    params.push(req.user.id);
  } else {
    query = baseQuery;
  }

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.json({ message: 'Task updated successfully' });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const baseQuery = 'DELETE FROM tasks WHERE id = ?';
  const params = [id];

  if (req.user.role !== 'manager') {
    query = baseQuery + ' AND userId = ?';
    params.push(req.user.id);
  } else {
    query = baseQuery;
  }

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.json({ message: 'Task deleted successfully' });
  });
};

exports.getStats = async (req, res) => {
  try {
    const condition = req.user.role === 'manager' ? '' : `WHERE userId = ${req.user.id}`;
    const [rows] = await db.promise().query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as inProgress,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM tasks
      ${condition}
    `);

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.promise().query(`
      SELECT 
        COUNT(*) as totalTasks,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as inProgress,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM tasks
      WHERE userId = ?
    `, [userId]);

    res.json({
      total: rows[0].totalTasks,
      pending: rows[0].pending,
      inProgress: rows[0].inProgress,
      completed: rows[0].completed
    });    
  } catch (err) {
    console.error("User Stats Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getManagerStats = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        COUNT(*) as totalTasks,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as inProgress,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM tasks
    `);

    res.json(rows[0]);
  } catch (err) {
    console.error("Manager Stats Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
