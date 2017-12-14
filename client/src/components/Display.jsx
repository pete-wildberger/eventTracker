import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { shows: [] };
    this.getShows = this.getShows.bind(this);
  }
  displayShows() {
    return this.state.shows.map(show => {
      // if (show.image) {
      return (
        <div className="row" key={show.title}>
          <div className="col-3">
            <img src={show.image} alt={show.title} />
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
      // } else {
      //   <div className="col-9">
      //     <h1>{show.venue}</h1>
      //     <h1>
      //       <a href={show.linkTo}>{show.title}</a>
      //     </h1>
      //     <p>{show.date}</p>
      //     <p>{show.doors}</p>
      //     <p>{show.cost}</p>
      //   </div>;
      // }
    });
  }
  getShows() {
    axios.get('/events').then(data => {
      this.setState({ shows: data.data });
    });
  }
  componentDidMount() {
    console.log('cdm');
    this.getShows();
  }
  render() {
    if (this.state.shows === []) {
      return (
        <div>
          <p>loading</p>
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
