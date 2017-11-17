import React, { Component } from 'react';
import '../encounters.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Encounters extends Component {
  constructor(props){
    super(props);
    this.state = {
      encounters: []
    };
  }

  render () {
    return (
      <div className="encounter">
        <h1>Recent Encounters</h1>
        <p className="report">See an alien? Report it!</p>
        <ul>
          {this.state.encounters.map(encounter => (
          <li key={encounter.id}>
            <p>{encounter.date}-{encounter.atype}</p>
            <p>{encounter.action}</p>
          </li>
          ))}
        </ul>
        <Link to='./Reports'><h1> Report Encounter</h1></Link>
      </div>
    );
  }

  componentDidMount() {
    axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
    .then((response) => {
      this.setState({
        encounters: response.data.encounters
      });
      console.log(response.data);
    });
  }
}

export default Encounters;
