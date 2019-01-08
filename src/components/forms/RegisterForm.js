import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { setAuthToken } from "./../../actions";
import { connect } from "react-redux";
import LocalApi from "./../../apis/local";

class RegisterForm extends Component {
  state = {
    email: "",
    password: ""
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    LocalApi.post("/auth/register", { email, password })
      .then(response => {
        this.props.setAuthToken(response.data.token);
        this.props.history.push("/bookmarks");
      })
      .catch(err => console.log(err));

    // fetch("http://localhost:3001/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ email, password })
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.log(error));
  };

  onInputChange = (name, event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;
    console.log(this.props);

    return (
      <form onSubmit={this.onFormSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={event => this.onInputChange("email", event)}
          />
        </p>
        <p>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            value={password}
            onChange={event => this.onInputChange("password", event)}
          />
        </p>
        <p>
          <input type="submit" value="Register New User" />
        </p>
      </form>
    );
  }
}

export default connect(
  null,
  { setAuthToken }
)(withRouter(RegisterForm));
