require('dotenv').config();
const express = require('express');
const cors = require('cors');

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Samvit Abacus API is running. Use /api routes to interact.');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Samvit Abacus API running' });
});

app.use('/api', contactRoutes);

// Global error handler fallback
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Unexpected server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
