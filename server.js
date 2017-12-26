require('dotenv').config();
const express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8081,
  dbMethods = require('./db/methods'),
  venues = require('./venues'),
  eventTracker = require('./eventTracker');

app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/events', (req, res) => {
  console.log('ping');
  dbMethods.selectAll().then(data => {
    console.log(data);
    res.send(data);
  });
});

setInterval(() => {
  getEvents();
}, 86400000); // every 5 minutes (300000)

function getEvents() {
  console.log('getEvents');
  eventTracker.makeList().then(data => {
    let scraped = data[0].concat(data[1], data[2], data[3]);
    console.log('scraped');
    dbMethods.addEvents(scraped);
  });
}
// app.get('/test', (req, res) => {
//   console.log('test');
//   eventTracker.getHTML('http://acadiapub.com/events/', data => {
//     venues.acadia(data);
//   });
// });

app.get('/', (req, res) => {
  console.log('base url hit');
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port);

console.log('Magic happens on port 8081');
