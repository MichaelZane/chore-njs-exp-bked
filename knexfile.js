require("dotenv").config()

module.exports = {
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
 
    pool: {
      min: 0,
      max: 15
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  development: {
    client: "pg",
    connection: {
      // host: process.env.HOST,
      // database: process.env.DATABASE,
      // user: process.env.USER,
      // password: process.env.PASSWORD
    },
//    connection: 'postgres://localhost/postgres',
    pool: {
      min: 0,
      max: 100
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
  },
  
  test: {
    client: "pg",
    connection: process.env.DATABASE_TEST,
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",

    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
