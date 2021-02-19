var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var rootRouter = require('./routes/index');
var menRouter = require('./routes/men/index');
var womenRouter = require('./routes/women/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', rootRouter);
app.use('/men', menRouter);
app.use('/women', womenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err.message ? err.message : '' });
});

module.exports = app;