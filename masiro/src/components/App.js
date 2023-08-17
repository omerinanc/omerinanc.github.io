import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Home from "./home";
import axios from "axios";
// import Login from "./auth/Login";
import Registration from "./auth/registration";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
          });
        } else if (
          !response.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  }

  handleSuccessfulAuth(data) {
    this.handleLogin();
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin() {
    console.log("Setting loggedInStatus to LOGGED_IN...");
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  render() {
    return (
      <div className="app">
        <h1>Masiro</h1>
        <BrowserRouter>
          <Switch>
            {/* <Route
              exact
              path={"/login"}
              render={(props) => (
                <Login
                  {...props}
                  loggedInStatus={this.handleLogin}
                  handleLogin={this.handleLogin}
                />
              )}
            /> */}
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  // handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={(props) => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/registration"}
              render={(props) => (
                <Registration
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
