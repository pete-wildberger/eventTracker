const fs = require('fs'),
  venues = require('./venues'),
  async = require('async'),
  request = require('request'),
  dbMethods = require('./db/methods.js'),
  rp = require('request-promise');

// pings venue and returns data
exports.getHTML = (url, callback) => {
  let data = request(url, (error, response, html) => {
    // First we'll check to make sure no errors occurred when making the request
    if (!error) {
      callback(html);
    } else {
      console.log('oops');
    }
  });
};

exports.makeList = async () => {
  let list = [];
  let response;
  try {
    response = await rp('http://palmersbar.net/events');
    list.push(venues.palmers(response));

    response = await rp('https://www.thecedar.org/listing/');
    list.push(venues.cedar(response));

    response = await rp('http://www.nomadpub.com/calendar/');
    list.push(venues.nomad(response));

    response = await rp('http://acadiapub.com/events/');
    list.push(venues.acadia(response));
  } catch (e) {}

  return list;
};
