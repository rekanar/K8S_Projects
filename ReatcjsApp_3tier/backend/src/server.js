const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'vignan_school',
  user: process.env.DB_USER || 'vignan_admin',
  password: process.env.DB_PASSWORD || 'vignan@2024',
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
  }
});

// School info
app.get('/api/school', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM school_info LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Students
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/students/stats', async (req, res) => {
  try {
    const total = await pool.query('SELECT COUNT(*) as count FROM students');
    const byClass = await pool.query(
      'SELECT class, COUNT(*) as count FROM students GROUP BY class ORDER BY class'
    );
    res.json({
      total: parseInt(total.rows[0].count),
      byClass: byClass.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Teachers
app.get('/api/teachers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teachers ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Courses
app.get('/api/courses', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, t.name as teacher_name
      FROM courses c
      LEFT JOIN teachers t ON c.teacher_id = t.id
      ORDER BY c.name
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Announcements
app.get('/api/announcements', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM announcements ORDER BY date DESC LIMIT 10'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Events
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events ORDER BY event_date ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Achievements
app.get('/api/achievements', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM achievements ORDER BY year DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retry DB connection
const connectWithRetry = async (retries = 10, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('Database connected successfully');
      return;
    } catch (err) {
      console.log(`DB connection attempt ${i + 1}/${retries} failed. Retrying in ${delay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  console.error('Failed to connect to database after all retries');
  process.exit(1);
};

connectWithRetry().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vignan School API running on port ${PORT}`);
  });
});
