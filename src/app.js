const express = require('express');
const morgan = require('morgan');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(require('./routes'));
app.use('/api/consumos', require('./routes/consumos'));

module.exports = app;