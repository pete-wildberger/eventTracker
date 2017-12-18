const pool = require('./connection.js');

module.selectAll = () => {
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

        resolve(result.rows[0]);
      });
    });
  });
};
