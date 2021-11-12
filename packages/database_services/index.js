const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const hostname = 'localhost';
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use(require('./middleware/request-logger'));
require('./startup/routes')(app);
app.use(require('./middleware/unknown-endpoint'));
app.use(require('./middleware/error-handler'));

const server = http.createServer(app);

server.listen(port,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
