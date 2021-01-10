const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser')

const childRouter = require('../child/child-router');
const parentRouter = require('../parent/parent-router');
const authRouter = require('../auth/auth-router');
const choresRouter = require('../chores/chores-router');


const server = express();
server.use(express.static('public'));
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

server.use(helmet());
server.use(express.json());
server.use(cors());

// routes

server.use('/api/auth/parent', parentRouter);
server.use('/api/auth/child', childRouter);
server.use('/api/auth/',  authRouter);
server.use('/api/chore', choresRouter);

// server check

server.get('/', (req, res) => {
  res.status(200).json({  api: "If you see me, I am here..."});
});

module.exports = server 
