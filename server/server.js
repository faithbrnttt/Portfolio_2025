const express = require('express');
require('@dotenvx/dotenvx').config();
const cors = require('cors');
const morgan = require('morgan');
const projectRoutes = require('../routes/projectRoutes');
const { errorHandler } = require('../middleware/errorHandler');
const connectDB = require('../config/db');


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/projects', projectRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Running..."));
