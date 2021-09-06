require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// API
// Example
app.get('/', (req, res) => res.status(200).json({ message: 'API Running' }));
app.use('/api/users', require('./routes/users'));
app.use('/api/cars', require('./routes/cars'));

module.exports = app;
