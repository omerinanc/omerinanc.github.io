import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: " NOT_LOGGED_IN",
    };
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
    this.props.history.push("/");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        this.handleLogout();
      })
      .catch((error) => {
        console.log("Logout error", error);
      });
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button
          onClick={() => this.handleLogoutClick()}
          className="btn btn-primary btn-sm"
        >
          Logout
        </button>
      </div>
    );
  }
}
