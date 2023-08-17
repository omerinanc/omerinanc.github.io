import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginError: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    console.log("Logging in with:", email, password);

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Login response:", response.data);

        if (response.data.logged_in) {
          console.log("Login successful!");
          this.props.handleSuccessfulAuth(response.data.user);
        } else {
          console.log("Login failed:", response.data.status);
          this.setState({
            loginError: "Login failed. Please check your credentials.",
          });
        }
      })
      .catch((error) => {
        console.log("Login error", error);
        this.setState({
          loginError: "An error occurred during login. Please try again.",
        });
      });
  }

  render() {
    if (this.props.loggedInStatus) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          {this.state.loginError && (
            <div className="error-message">{this.state.loginError}</div>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
