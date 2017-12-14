const fs = require('fs'),
  request = require('request'),
  cheerio = require('cheerio');

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
// scrapes html data
exports.objectify = html => {
  var shows = [];
  let titles = [];
  let doorss = [];
  let dates = [];
  let images = [];
  // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
  var $ = cheerio.load(html);

  $('.headliners > a').each((i, elem) => {
    titles[i] = elem.children[0].data;
  });
  $('.doors').each((i, elem) => {
    doorss[i] = elem.children[0].data;
  });
  $('.dates').each((i, elem) => {
    dates[i] = elem.children[0].data;
  });
  $('img').each((i, elem) => {
    images[i] = elem.attribs.src;
  });

  for (var i = 0; i < titles.length; i++) {
    let json = {
      title: titles[i],
      date: dates[i],
      doors: doorss[i],
      image: images[i]
    };
    // check for small picture duplicates
    if (json.image.slice(-9, -4).includes('100')) {
    } else {
      shows.push(json);
    }
  }
  return shows;
};
