const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all posts
router.get('/', (req, res) => {
  db.all('SELECT id, title, body, created_at, updated_at FROM posts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single post
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT id, title, body, created_at, updated_at FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Post not found' });
    res.json(row);
  });
});

// Create post
router.post('/', (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'Title and body required' });

  const stmt = db.prepare('INSERT INTO posts (title, body) VALUES (?, ?)');
  stmt.run([title, body], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT id, title, body, created_at, updated_at FROM posts WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(row);
    });
  });
});

// Update post
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'Title and body required' });

  const stmt = db.prepare('UPDATE posts SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  stmt.run([title, body, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Post not found' });
    db.get('SELECT id, title, body, created_at, updated_at FROM posts WHERE id = ?', [id], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(row);
    });
  });
});

// Delete post
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare('DELETE FROM posts WHERE id = ?');
  stmt.run([id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ success: true });
  });
});

module.exports = router;
