const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const childRouter = require('../child/child-router');
const parentRouter = require('../parent/parent-router');
const authRouter = require('../auth/auth-router');
const choresRouter = require('../chores/chores-router');
const rateLimit = require('express-rate-limit');
const { message } = require('statuses');

const server = express();
server.use(express.static('public'));
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(express.json())
server.use(helmet());
server.use(cors({ origin: true }));

// Create rate limit rule

// const apiRequestLimiter = rateLimit({
//   windowMs: 15 * 10 * 1000, // 15 minute
//   max: 100 ,// limit each IP to 2 per windowms
//   handler: function (req, res) {
//     return res.status(429).json({
//       error: "You have sent too many requests.  Please wait for awhile then try again"
//     })
//   } 
// })

//use the the limit rule as app middleware

// server.use(apiRequestLimiter)

// routes

server.use('/api/auth/parent', parentRouter);
server.use('/api/auth/child', childRouter);
server.use('/api/auth/',  authRouter);
server.use('/api/chore', choresRouter);

//  server check

server.get('/', (req, res) => {
  res.status(200).json({  api: "If you see me, I am here..."});
});


module.exports = server 
