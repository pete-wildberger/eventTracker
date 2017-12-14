const cheerio = require('cheerio');

// scrapes html data
exports.cedar = html => {
  var shows = [];
  let titles = [];
  let doorss = [];
  let dates = [];
  let images = [];
  let costs = [];
  let links = [];
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
  $('.headliners > a').each((i, elem) => {
    links[i] = elem.attribs.href;
  });
  $('.price-range').each((i, elem) => {
    costs[i] = elem.children[0].data;
  });

  for (var i = 0; i < titles.length; i++) {
    let json = {
      venue: 'Cedar Cultural Center',
      title: titles[i],
      date: dates[i],
      doors: doorss[i],
      image: images[i],
      cost: costs[i],
      linkTo: links[i]
    };
    // check for small picture duplicates
    if (json.image.slice(-9, -4).includes('100')) {
    } else {
      shows.push(json);
    }
  }
  return shows;
};

exports.palmers = html => {
  var shows = [];
  let titles = [];
  let doorss = [];
  let dates = [];
  let costs = [];
  let links = [];
  // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
  var $ = cheerio.load(html);

  $('.tribe-events-list-event-title > a').each((i, elem) => {
    titles[i] = elem.children[0].data;
  });
  $('.tribe-event-date-start').each((i, elem) => {
    dates[i] = elem.children[0].data;
  });
  $('.ticket-cost').each((i, elem) => {
    costs[i] = elem.children[0].data;
  });
  $('.tribe-event-url').each((i, elem) => {
    links[i] = elem.attribs.href;
  });

  for (var i = 0; i < titles.length; i++) {
    let arr = dates[i].split('@');
    let json = {
      venue: 'Palmers',
      title: titles[i],
      date: arr[0],
      doors: arr[1],
      cost: costs[i],
      linkTo: links[i]
    };
    // check for small picture duplicates

    shows.push(json);
  }
  return shows;
};
