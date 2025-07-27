const mysql = require('mysql2');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

console.log('🌍 Loading .env from .env');
console.log('✅ Loaded ENV:', {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
});

const initConnection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD
});

initConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (err) => {
  if (err) {
    console.error('❌ Error creating database:', err.message);
  } else {
    console.log(`✅ Database "${DB_NAME}" ensured.`);
  }
});

const db = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true
});


db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
  console.log(`✅ Connected to MySQL database "${DB_NAME}"`);

  const createTables = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role ENUM('user', 'manager') DEFAULT 'user',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      title VARCHAR(255),
      description TEXT,
      status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  db.query(createTables, (err) => {
    if (err) {
      console.error('❌ Error creating tables:', err.message);
    } else {
      console.log('✅ Tables "users" and "tasks" ensured.');
    }
  });
});

module.exports = db;
