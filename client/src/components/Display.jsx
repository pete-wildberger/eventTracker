import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      isFetching: true
    };
    this.getShows = this.getShows.bind(this);
    // this.testNo = this.testNo.bind(this);
  }
  displayShows() {
    let preform = this.state.shows;
    let thisYear = [];
    // sort ascending by date
    preform.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    preform.forEach(show => {
      if (show.date.includes('Dec')) {
        thisYear.push(show);
      }
    });
    // var search_term = 'Dec';
    //
    // for (var i = preform.length - 1; i >= 0; i--) {
    //   if (preform[i].date.includes(search_term)) {
    //     preform.splice(i, 1);
    //     // break;       //<-- Uncomment  if only the first term has to be removed
    //   }
    // }
    let sliced = preform.slice(0, -thisYear.length);

    let shows = thisYear.concat(sliced);

    return shows.map(show => {
      if (show.image) {
        return (
          <div className="row" key={show.title}>
            <div className="col-3">
              <img src={show.image} alt={show.title} className="inherit" />
            </div>
            <div className="col-6">
              <h1>{show.venue}</h1>
              <h1>
                <a href={show.linkTo}>{show.title}</a>
              </h1>
              <p>{show.date}</p>
              <p>{show.doors}</p>
              <p>{show.cost}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="row" key={show.title}>
            <div className="col-9">
              <h1>{show.venue}</h1>
              <h1>
                <a href={show.linkTo}>{show.title}</a>
              </h1>
              <p>{show.date}</p>
              <p>{show.doors}</p>
              <p>{show.cost}</p>
            </div>
          </div>
        );
      }
    });
  }
  getShows() {
    axios.get('/events').then(data => {
      this.setState({ shows: data.data, isFetching: false });
    });
  }
  // testNo() {
  //   axios.get('/test');
  // }
  componentDidMount() {
    console.log('cdm');
    this.getShows();
    // this.testNo();
  }
  render() {
    if (this.state.isFetching == true) {
      return (
        <div>
          <img className="center-img" src="https://media.giphy.com/media/26BRA7WJEcn7yJy3C/giphy.gif" alt="Loading" />
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header />
          <div className="body">
            <div className="phone-title row">
              <div className="col-9">
                <h1 className="center">West Bank Events</h1>
              </div>
            </div>
            {this.displayShows()}
          </div>
          <Footer />
        </div>
      );
    }
  }
}
export default Display;
