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
  getEvents();
  // eventTracker.makeList().then(data => {
  //   let sendMe = data[0].concat(data[1], data[2], data[3]);
  //   console.log('sendMe'.sendMe);
  //   dbMethods.addEvents(sendMe);
  //   res.send(sendMe);
  // });
  dbMethods.selectAll().then(data => {
    console.log('to send data', data);
    res.send(data);
  });
});
function getDB(callback) {
  dbMethods.selectAll().then(data => {
    console.log('data', data);
    callback(data);
  });
}
function getEvents() {
  var props = ['title', 'date', 'doors'];
  getDB(db => {
    let events = db;
    eventTracker.makeList().then(data => {
      let scraped = data[0].concat(data[1], data[2], data[3]);
      var result = events
        .filter(function(o1) {
          // filter out (!) items in result2
          return !scraped.some(function(o2) {
            return o1.id === o2.id; // assumes unique id
          });
        })
        .map(function(o) {
          // use reduce to make objects with only the required properties
          // and map to apply this to the filtered array as a whole
          return props.reduce(function(newo, name) {
            newo[name] = o[name];
            return newo;
          }, {});
        });
      dbMethods.addEvents(result);
      console.log(results);
    });
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
