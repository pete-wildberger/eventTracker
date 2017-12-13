import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="app">
        <Header />
        <div className="body">info will go here</div>
        <Footer />
      </div>
    );
  }
}
export default Display;
