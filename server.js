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
  // eventTracker.makeList().then(data => {
  //   let sendMe = data[0].concat(data[1], data[2], data[3]);
  //   console.log('sendMe'.sendMe);
  //   dbMethods.addEvents(sendMe);
  //   res.send(sendMe);
  // });
  dbMethods.selectAll().then(data => {
    res.send(data);
  });
});

var dayInMilliseconds = 1000 * 60 * 60 * 24;
setInterval(function() {
  getEvents();
}, dayInMilliseconds);

setInterval(function() {
  dbMethods.deleteEvents().then(data => {
    console.log('deleted');
  });
}, dayInMilliseconds);

// dbMethods.deleteEvents().then(data => {
//   console.log('deleted');
// });

function getDB(callback) {
  console.log('getDB');
  dbMethods.selectAll().then(data => {
    callback(data);
  });
}
function getEvents() {
  console.log('getEvents');
  // var props = ['venue', 'title', 'date', 'doors', 'image', 'linkTo', 'cost'];
  // getDB(db => {
  //   let events = db;
  eventTracker.makeList().then(data => {
    let scraped = data[0].concat(data[1], data[2], data[3]);
    console.log('scraped');
    // var result = events
    //   .filter(function(o1) {
    //     console.log('filter');
    //     // filter out (!) items in result2
    //     return !scraped.some(function(o2) {
    //       return o1.venue === o2.venue; // assumes unique id
    //     });
    //   })
    //   .map(function(o) {
    //     console.log('map', o);
    //     // use reduce to make objects with only the required properties
    //     // and map to apply this to the filtered array as a whole
    //     return props.reduce(function(newo, name) {
    //       console.log('reduce');
    //       newo[name] = o[name];
    //       return newo;
    //     }, {});
    //   });
    // if (result === []) {
    //   console.log('empty');
    // } else {
    dbMethods.addEvents(scraped).then(data => {
      console.log('make an add', data);
    });
    // }
  });
  // });
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
