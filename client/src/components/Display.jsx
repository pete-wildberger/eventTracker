import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
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
    console.log('displayShows');
    let preform = this.state.shows;
    let thisYear = [];
    // sort ascending by date
    preform.sort((a, b) => {
      return a.date - b.date;
    });
    // var search_term = 'Dec';
    //
    // for (var i = preform.length - 1; i >= 0; i--) {
    //   if (preform[i].date.includes(search_term)) {
    //     preform.splice(i, 1);
    //     // break;       //<-- Uncomment  if only the first term has to be removed
    //   }
    // }

    return preform.map(show => {
      console.log('show html');
      if (show.image) {
        let dateDoors = `${show.date} ${show.doors}`;
        return (
          <div className="row" key={show.title}>
            <div className="col-3 polaroid-images">
              <a href="" title={dateDoors}>
                <img src={show.image} alt={show.title} className="inherit" />
              </a>
            </div>
            <div className="col-6">
              <h1>{show.venue}</h1>
              <h1>
                <a href={show.linkTo}>{show.title}</a>
              </h1>
              <p>{moment(show.date).format('MMM DD')}</p>
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
              <p>{moment(show.date).format('MMM DD')}</p>
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
      console.log('data', data.data);
      this.setState({ shows: data.data, isFetching: false });
    });
  }
  // testNo() {
  //   axios.get('/test');
  // }
  componentDidMount() {
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
          <div className="body">{this.displayShows()}</div>
          <Footer />
        </div>
      );
    }
  }
}
export default Display;
