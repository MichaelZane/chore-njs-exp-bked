require("dotenv").config()

module.exports = {
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    ssl: true,
     
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
      host: process.env.HOST,
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD
    },
    
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
      // tableName: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
