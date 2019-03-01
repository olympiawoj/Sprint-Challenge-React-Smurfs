import React, { Component } from "react";
import { Route, Link, NavLink } from "react-router-dom";

import axios from "axios";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  //`http://localhost:3333` is the address to the server doorstop
  //  /smurfs is the "endpoint"

  componentDidMount() {
    console.log("CDM now running");
    axios
      .get("http://localhost:3333/smurfs")
      .then(response => {
        console.log("Get Response:", response);
        this.setState({ smurfs: response.data });
      })
      .catch(error => alert("Get had an error"));
  }

  postSmurfToServer = smurf => {
    axios
      .post("http://localhost:3333/smurfs", smurf)
      .then(response => {
        console.log("Post Response:", response);
        this.setState({ smurfs: response.data });
      })
      .catch(error => alert("Post had an error"));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink exact to="/" activeClassName="activeNavButton">
            Home
          </NavLink>
          <NavLink to="/smurf-form" activeClassName="activeNavButton">
            Add
          </NavLink>
        </nav>
        {/* <SmurfForm postSmurfToServer={this.postSmurfToServer} /> */}
        {/* <Smurfs smurfs={this.state.smurfs} /> */}
        <Route
          exact
          path="/"
          render={props => <Smurfs smurfs={this.state.smurfs} />}
        />
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm postSmurfToServer={this.postSmurfToServer} />
          )}
        />
      </div>
    );
  }
}

export default App;
