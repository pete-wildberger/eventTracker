const pg = require('pg');

var config = {
  host: 'localhost',
  database: 'eventTracker'
};

var pool = new pg.Pool(config);

module.exports = pool;
