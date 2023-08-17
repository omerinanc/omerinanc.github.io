import React, { Component } from "react";
import Login from "./auth/Login";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data); // Pass the data received from the login response
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <h3>Status: {this.props.loggedInStatus}</h3>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <p>
          Don't have an account? <Link to="/registration">Register</Link>
        </p>
      </div>
    );
  }
}
