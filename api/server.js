const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require( 'body-parser' );
const path = require( 'path' );



const childRouter = require('../child/child-router');
const parentRouter = require('../parent/parent-router');
const authRouter = require('../auth/auth-router');
const choresRouter = require('../chores/chores-router');

const router = express.Router();
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use( bodyParser.urlencoded( { extended: false } ) );
server.use( bodyParser.json() );

// routes

server.use('/api/auth/parent', parentRouter);
server.use('/api/auth/child', childRouter);
server.use('/api/auth/',  authRouter);
server.use('/api/chore', choresRouter);

// server check

server.get('/', (req, res) => {
  res.status(200).json({ api: "If you see me, I am here..."});
});

if ( process.env.NODE_ENV === 'production' ) {
	// Set a static folder
	server.use( express.static( 'client/build' ) );
	server.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) );
}
module.exports = server;