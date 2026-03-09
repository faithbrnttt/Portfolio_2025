// server.js
const express = require('express');
require('@dotenvx/dotenvx').config();
const cors = require('cors');
const morgan = require('morgan');
const projectRoutes = require('./routes/projectRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const contactRoutes = require("./routes/contactRoutes");
connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3600',
    'http://localhost:3700',
    'https://faithb.dev'
  ],
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));

app.use(express.json());

// Optional health check to quickly test headers
app.get('/health', (req, res) => res.json({ ok: true }));

// Your API base path is /api/projects
app.use('/api/projects', projectRoutes);

app.use("/api", contactRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
