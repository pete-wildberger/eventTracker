const express = require('express'),
  fs = require('fs'),
  request = require('request'),
  cheerio = require('cheerio'),
  app = express();

app.get('/scrape', (req, res) => {
  let url = 'https://www.thecedar.org/listing/';

  request(url, (error, response, html) => {
    // First we'll check to make sure no errors occurred when making the request
    if (!error) {
      var shows = [];
      let titles = [];
      let doorss = [];
      let dates = [];
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

      for (var i = 0; i < titles.length; i++) {
        let json = {
          title: titles[i],
          date: dates[i],
          doors: doorss[i]
        };
        shows.push(json);
      }
      console.log('shows', shows);
    }
    fs.writeFile('output.json', JSON.stringify(shows, null, 4), function(err) {
      console.log('File successfully written! - Check your project directory for the output.json file');
    });
    res.json(shows);
  });
});

app.listen('8081');

console.log('Magic happens on port 8081');
