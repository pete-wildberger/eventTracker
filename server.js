const express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  eventTracker = require('./eventTracker'),
  output = require('./output.json');

app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/events', (req, res) => {
  eventTracker();
  res.send(output);
});

app.get('/', (req, res) => {
  console.log('base url hit');
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen('8081');

console.log('Magic happens on port 8081');
