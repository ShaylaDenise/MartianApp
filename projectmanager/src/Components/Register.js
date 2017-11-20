import React, { Component } from 'react';
import '../register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      age: '',
      job: '',
      occupation: []
    };
    this._handleChangeName = this._handleChangeName.bind(this);
    this._handleChangeAge = this._handleChangeAge.bind(this);
    this._handleChangeJob = this._handleChangeJob.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChangeName (event) {
    this.setState({
      name: event.target.value
    });
  }

  _handleChangeAge (event) {
    this.setState({
      age: event.target.value
    });
  }

  _handleChangeJob (event) {
    this.setState({
      job: event.target.value
    });
  }

  _handleSubmit(event) {
    if (this.state.name  === "" || this.state.age === "" || !this.state.job === "") {
        alert("Please complete required fields");
        event.preventDefault();
    } else {
    axios.post("https://red-wdp-api.herokuapp.com/api/mars/colonists",
    {"colonist":
        {"name":this.state.name,
        "age": this.state.age,
        "job_id" : this.state.job}
  })
  .then(response => {
    sessionStorage.setItem(
      "colonist_id",
      JSON.stringify({
        id: response.data.colonist.id
      })
    );
  })
    .catch(function (error) {
      console.log(error);
    });
  }
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
          <form>
            <label>
              <input type="text" name="name" placeholder="Name" onChange={(event) => this._handleChangeName(event)}/>
            </label>
            <label>
              <input type="number" min="0.01" step="0.01" max="2500" name="age" placeholder="Age" onChange={(event) => this._handleChangeAge(event)}/>
            </label>
            <label>
              <select className="drop-down-menu" onChange={this._handleChangeJob}>
                <option> Select an occupation... </option>
                {this.state.occupation.map(job => (
                  <option value={job.id} key={job.id}> {job.name} </option>
                ))}
              </select>
              <Link to='./encounters'><button onClick={(event) => this._handleSubmit(event)} type="submit">Check In</button></Link>
            </label>
          </form>
        </div>
      );
    }
  }

export default Register;
