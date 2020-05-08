const express = require('express');
const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

var cors = require('cors')

const server = express();

// global middleware
server.use(cors());
server.use(express.json());

function logger(req, res, next) {
    const timestamp = new Date();
    console.log(`[${timestamp}] | Method: ${req.method} | Req URL: ${req.url}`);
    next();
};
server.use(logger);

server.get('/', (req, res) => {
    res.send(`<h2>Woooooo, Sprint Day!</h2>`);
});

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);



module.exports = server;
