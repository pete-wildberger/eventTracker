const express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8081,
  eventTracker = require('./eventTracker');

app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/events', (req, res) => {
  console.log('ping');
  eventTracker.eventTracker(data => {
    res.send(eventTracker.objectify(data));
  });
});

app.get('/', (req, res) => {
  console.log('base url hit');
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port);

console.log('Magic happens on port 8081');
