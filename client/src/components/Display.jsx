import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import output from '../output.json';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  displayShows() {
    return output.shows.map(show => {
      return (
        <div className="row" key={show.title}>
          <div className="col-3">
            <img src={show.image} alt={show.title} />
          </div>
          <div className="col-6">
            <h1>{show.title}</h1>
            <p>{show.date}</p>
            <p>{show.doors}</p>
          </div>
        </div>
      );
    });
  }
  componentDidMount() {}
  render() {
    return (
      <div className="app">
        <Header />
        <div className="body">{this.displayShows()}</div>
        <Footer />
      </div>
    );
  }
}
export default Display;
