const { Pool } = require("pg");
//pool is a class that allows us to make queries
//pg is the bridge between the db and server

//credentials to login to the db
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};

//above is an object with a key of query
//this file is importing pool and exporting query
//so this file is the man with the hose
//connecting server to postgres
