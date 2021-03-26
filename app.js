const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api_docs.json');

const rootRouter = require('./routes/index');
const menRouter = require('./routes/men/index');
const womenRouter = require('./routes/women/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the following command for generating api_docs:
// swagger-inline "./routes/**/*.js" --base "api_docs_base.json" > api_docs.json
app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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