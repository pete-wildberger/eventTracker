const express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8081,
  venues = require('./venues'),
  eventTracker = require('./eventTracker');

app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/events', (req, res) => {
  console.log('ping');
  eventTracker.makeJSON().then(data => {
    let sendME = data[0].concat(data[1]);
    res.send(sendME);
  });
});

app.get('/', (req, res) => {
  console.log('base url hit');
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port);

console.log('Magic happens on port 8081');
