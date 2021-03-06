const cheerio = require('cheerio');
const moment = require('moment');
// scrapes html data
exports.cedar = html => {
  console.log('cedar');
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
    let time = dates[i].slice(0, -3);
    if (time[0] != 'D') {
      time += ' 2018';
    } else {
      time += ' 2017';
    }
    let json = {
      venue: 'Cedar Cultural Center',
      title: titles[i],
      date: moment(new Date(time)).format('MMM DD YYYY'),
      doors: doorss[i],
      image: images[i],
      linkTo: ` https://www.thecedar.org${links[i]}`,
      cost: costs[i]
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
  console.log('palmers');
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
    let time = arr[0];
    if (time[0] != 'D') {
      time += ' 2018';
    } else {
      time += ' 2017';
    }
    let json = {
      venue: 'Palmers',
      title: titles[i],
      date: moment(new Date(time)).format('MMM DD YYYY'),
      doors: arr[1],
      image: null,
      linkTo: links[i],
      cost: costs[i]
    };

    // check for small picture duplicates

    shows.push(json);
  }
  return shows;
};

exports.nomad = html => {
  console.log('nomad');
  var shows = [];
  let titles = [];
  let doorss = [];
  let days = [];
  let months = [];
  // let costs = [];
  let images = [];
  let links = [];
  // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
  var $ = cheerio.load(html);

  $('.event-item-title').each((i, elem) => {
    titles[i] = elem.children[0].data;
  });
  $('.calendar-item-month').each((i, elem) => {
    months[i] = elem.children[0].data;
  });
  $('.calendar-item-date').each((i, elem) => {
    let classes = elem.attribs.class;
    let day = classes.split(' ');
    let sendMe = day[1].replace('day-', '');
    days[i] = sendMe;
  });
  $('.calendar-event-item > span:nth-child(3) ').each((i, elem) => {
    doorss[i] = elem.children[0].data;
  });
  // $('.event-item-description p:nth-child(2)').each((i, elem) => {
  //   costs[i] = elem.children[0].data;
  // });
  $('img.size-medium').each((i, elem) => {
    images[i] = elem.attribs.src;
  });
  $('.calendar-event-item > a').each((i, elem) => {
    links[i] = elem.attribs.href;
  });

  for (var i = 0; i < titles.length; i++) {
    let time = days[i];

    let mCheck = months[i];
    if (mCheck[0] != 'D') {
      time += ' 2018';
    } else {
      time += ' 2017';
    }
    let json = {
      venue: 'Nomad',
      title: titles[i],
      date: moment(new Date(`${months[i]} ${time}`)).format('MMM DD YYYY'),
      doors: doorss[i],
      image: images[i],
      linkTo: links[i],
      cost: null
    };

    // check for small picture duplicates
    shows.push(json);
  }

  return shows;
};

exports.acadia = html => {
  console.log('acadia');
  var shows = [];
  let objs = [];

  // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
  var $ = cheerio.load(html);

  $('.tribe-events-category-entertainment').each((i, elem) => {
    objs[i] = elem.attribs['data-tribejson'];
  });

  for (var i = 0; i < objs.length; i++) {
    let obj = JSON.parse(objs[i]);
    let rightNow = moment(new Date()).format('MMM DD');
    let arr = obj.startTime.split('@');
    let time = arr[0];
    if (new Date(time) < new Date(rightNow)) {
    } else {
      if (time[0] != 'D') {
        time += ' 2018';
      } else {
        time += ' 2017';
      }
      let json = {
        venue: 'Acadia',
        title: obj.title,
        date: moment(new Date(time)).format('MMM DD YYYY'),
        doors: arr[1],
        image: obj.imageSrc,
        linkTo: obj.permalink,
        cost: null
      };
      shows.push(json);
      // check for small picture duplicates
    }
  }
  return shows;
};
