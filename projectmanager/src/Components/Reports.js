import React, { Component } from "react";
import axios from "axios";
import "../reports.css";
import { Link } from "react-router-dom";
import marsImg from "./Images/martian-surface.jpg";

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      action: "",
      actionInput: true,
      aliens: [],
      alienType: 0,
      alienSelected: true
    };
    this._handleChangeAction = this._handleChangeAction.bind(this);
    this._SendReport = this._SendReport.bind(this);
    this._handleChangeAlien = this._handleChangeAlien.bind(this);
  }

  _handleChangeAction(event) {
    this.setState({
      action: event.target.value,
      actionInput : true,
    });
  }

  _handleChangeAlien(event) {
    this.setState({
      alienType: event.target.value,
      alienSelected : true,
    });
  }

  _SendReport(event) {
      var dateSubmitted = new Date();
      var dd = dateSubmitted.getDate();
      var mm = dateSubmitted.getMonth();
      var yyyy = dateSubmitted.getFullYear();
      dateSubmitted = yyyy + mm + dd;
      axios.post({
        url: "https://red-wdp-api.herokuapp.com/api/mars/encounters",
        response: {
          encounter: {
            alienType: this.state.aliens[this.state.alienType].type,
            dateSubmitted: dateSubmitted,
            action: this.state.action,
            colonist_id: JSON.parse(sessionStorage.getItem("colonist_id")).id
          }
        }
      })
    }

    componentDidMount() {
      axios.get("https://red-wdp-api.herokuapp.com/api/mars/aliens")
        .then(response => {
          console.log(response.data);
          this.setState({
            aliens: response.data.aliens
          });
        });
    }

  render() {
    return (
      <div className="report">
        <h1>Report Encounter </h1>
        <p>Safety on Mars is your responsibility!</p>
        <form>
          <select className={this.state.alienSelected.toString()} onChange={this.state._handleChangeAlien}>
            <option> Select Alien Type... </option>
            {this.state.aliens.map(alien => (
              <option value={alien.id} key={alien.id}> {alien.type} </option>
            ))}
          </select>
          <input className={this.state.actionInput.toString()} placeholder="Action Taken" onChange={this.state._handleChangeAction} />
        </form>
        <Link to={"/encounters"} onClick={this._sendReport}><h2> Submit Report </h2></Link>
        <img src={marsImg} alt="Mars Surface"/>
      </div>
    );
  }
}

export default Reports;
