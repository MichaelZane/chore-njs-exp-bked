require("dotenv").config()


module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD
    },
    connection: 'postgres://localhost/postgres',
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
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run("PRAGMA foreign_keys = ON", done)
    //   }
    // }
  },
  production: {
    client: "pg",
    connection: `${process.env.DATABASE_URL}?ssl=no-verify`,
    ssl: { rejectUnauthorized: false },
    
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
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
