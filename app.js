const express = require('express');
const app = express();

const usersRoutes = require('./api/routes/users');

const bodyParser = require('body-parser');

require('dotenv').config(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Headers',
        'Origin, X-requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/users', usersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


// Error handlers
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    });
})

module.exports = app;