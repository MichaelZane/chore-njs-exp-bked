require("dotenv").config()


module.exports = {
  development: {
    client: "pg",
  //   connection: {
  //     host: process.env.HOST,
  //     database: process.env.DATABASE,
  //     user: process.env.USER,
  //     password: process.env.PASSWORD
  //   },
    connection: 'postgres://localhost/postgres',
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  testing: {
    client: "pg",
    connection: {
      filename: "./data/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
