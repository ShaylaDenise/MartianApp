import React, { Component } from 'react';
import '../register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      nameInput: true,
      age: '',
      ageInput: true,
      job: '',
      occupation: [],
      jobSelected: true
    };
    this._handleChangeName = this._handleChangeName.bind(this);
    this._handleChangeAge = this._handleChangeAge.bind(this);
    this._handleChangeJob = this._handleChangeJob.bind(this);
    this._newProfile = this._newProfile.bind(this);
  }

  _handleChangeName (event) {
    this.setState({
      name: event.target.value,
      nameInput: true,
    });
  }

  _handleChangeAge (event) {
    this.setState({
      age: event.target.value,
      ageInput: true,
    });
  }

  _handleChangeJob (event) {
    this.setState({
      job: event.target.value,
      jobSelected: true
    });
  }

  _newProfile(event) {
    axios({
      method: "post",
      url: "https://red-wdp-api.herokuapp.com/api/mars/colonists",
      data: {
        colonist: {
          name: this.state.name,
          job_id: this.state.jobId,
          age: this.state.age
        }
      }
    })
      .then(response => {
        sessionStorage.setItem(
          "colonist_id",
          JSON.stringify({
            id: response.data.colonist.id
          })
        );
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    componentDidMount() {
      axios
      .get("https://red-wdp-api.herokuapp.com/api/mars/jobs")
      .then(response => {
        this.setState({
          occupation: response.data.jobs
        });
      });
    }

    render() {
      return (
        <div className="Register-Page">
          <h1 className="register">Register</h1>
          <form onSubmit={this.handleChange}>
            <label>
              <input type="text" name="name" placeholder="Name" />
            </label>
            <label>
              <input type="number" min="0.01" step="0.01" max="2500" name="age" placeholder="Age"/>
            </label>
            <label>
              <select className="drop-down-menu" onChange={this._handleChange}>
                <option> Select an occupation... </option>
                {this.state.occupation.map(job => (
                  <option value={job.id} key={job.id}> {job.name} </option>
                ))}
              </select>
              <Link to='./encounters'><button type="submit">Check In</button></Link>
            </label>
          </form>
        </div>
      );
    }
  }

export default Register;
