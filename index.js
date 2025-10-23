const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const postsRouter = require('./routes/posts');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// In development, allow CORS from React dev server
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

// API routes
app.use('/api/posts', postsRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ healthy: true }));

// ---- Serve React frontend (production) ----
const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));

// Serve React index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
// -------------------------------------------

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
