const knex = require('knex');

require('dotenv').config()

const knexConfig = require('../knexfile');

const environment = process.env.DB_ENV || "development" ;

module.exports = knex(knexConfig[environment]);



/* ''' config.js require("dotenv").config(); 
const SECRET_KEY = process.env.SECRET_KEY || 'test'; 
const PORT = +process.env.PORT || 3000; 
let DB_URI; if(process.env.NODE_ENV === 'test'){ DB_URI = 'jobly-test';
 } else { DB_URI = process.env.DATABASE_URL || 'jobly-db' } 
 module.exports = { SECRET_KEY, PORT, DB_URI, }; 
 ____ db.js const { Client } = require("pg"); 
 const { DB_URI } = require("./config"); 
 const client = new Client({ connectionString: DB_URI }); 
 client.connect(); 
 module.exports = client; ``` */