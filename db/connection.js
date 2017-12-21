const pg = require('pg');

var config = {
  host: 'localhost',
  database: 'eventTracker'
};

var pool = new pg.Pool(config);

// var pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });

module.exports = pool;
