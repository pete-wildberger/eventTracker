const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});
const pool = require('./connection.js');

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'eventTracker'
});

exports.selectAll = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM events', (err, result) => {
        done();
        if (err) {
          reject(err);
        }
        console.log('result', result);
        resolve(result.rows[0]);
      });
    });
  });
};

exports.addEvents = values => {
  console.log('addEvents', values);
  // our set of columns, to be created only once, and then shared/reused,
  // to let it cache up its formatting templates for high performance:
  let cs = new pgp.helpers.ColumnSet(['venue', 'title', 'date', 'doors', 'image', 'linkTo', 'cost'], {
    table: 'events'
  });
  // generating a multi-row insert query:
  let query = pgp.helpers.insert(values, cs);
  //=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')
  console.log('query', query);
  // executing the query:
  db
    .none(query)
    .then(data => {
      // success;
      console.log('addEvents', data);
    })
    .catch(error => {
      console.log('error', error);
      // error;
    });
};
