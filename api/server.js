const express = require('express');
const helmet = require('helmet');
const cors = require('cors');




// const formData = require('express-form-data')


const childRouter = require('../child/child-router');
const parentRouter = require('../parent/parent-router');
const authRouter = require('../auth/auth-router');
const choresRouter = require('../chores/chores-router');


const server = express();



server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use(formData.parse())

// server.use('/image-upload', (req, res) => {
//   const values = Object.values(req.files)
//   const promises = values.map(image => cloudinary.uploader.upload(image.path))

//   Promise
//     .all(promises)
//     .then(results => res.json(results))
//     .catch((err) => res.status(400).json(err))
// })

// routes

server.use('/api/auth/parent', parentRouter);
server.use('/api/auth/child', childRouter);
server.use('/api/auth/',  authRouter);
server.use('/api/chore', choresRouter);

// server check

server.get('/', (req, res) => {
  res.status(200).json({  api: "If you see me, I am here..."});
});

module.exports = server;