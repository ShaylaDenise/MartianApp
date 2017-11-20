import React, { Component } from 'react';
import MarsImg from './Images/mars-planet.png';
import '../home.css';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
      <div className="Home-Page">
        <h1 id="head">Mars Colony I.D. 1</h1>
        <img id="marsImg" src={MarsImg} alt=""/>
        <div id="holder">
          <div className="pulse">
            <Link to='./register'><button id="home-btn"></button></Link>
          </div>
          <h2 id="foot">Click to Enter</h2>
        </div>
      </div>
    );
  }
}
export default Home;
