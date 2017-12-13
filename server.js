const express = require('express'),
  app = express(),
  eventTracker = require('./eventTracker'),
  output = require('./output.json');

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
