const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/*
* RUTAS
*/

const users = require('./routes/usersRoutes');
const passport = require('passport');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json()); //parsear las respuestas en formato json
app.use(express.urlencoded({ 
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passports')(passport);

app.disable('x-powered-by');

app.set('port', port);

/*
* LLAMANDO RUTAS
*/

users(app);

server.listen(3000, '192.168.1.23' || 'localhost', function() {
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});

//RUTAS TEST



// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}

// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR