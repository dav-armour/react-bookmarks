import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./../styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import BookmarksPage from "./pages/BookmarksPage";
import Navbar from "./Navbar";
// import LocalApi from "./../apis/local";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import { setAuthToken } from "./../actions";

class App extends Component {
  // state = { token: sessionStorage.getItem("token") };

  // constructor(props) {
  //   super(props);
  //   const token = sessionStorage.getItem("token");
  //   this.state = { token };
  //   if (token) {
  //     LocalApi.setAuthHeader(token);
  //   }

  //   LocalApi.handleTokenError(() => {
  //     this.logout();
  //   });
  // }

  logout = () => {
    this.props.setAuthToken(null);
    // sessionStorage.clear();
    // this.setState({ token: null });
  };

  // onLoginRegisterFormSubmit = (token, cb) => {
  //   sessionStorage.setItem("token", token);
  //   LocalApi.setAuthHeader(token);
  //   this.setState({ token }, cb);
  // };

  render() {
    const { token } = this.props;
    return (
      <BrowserRouter>
        <div>
          <Navbar onLogout={this.logout} token={token} />
          {token && (
            <div>
              <h4>User is logged in!</h4>
            </div>
          )}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/register"
              render={props => {
                return (
                  <RegisterPage
                    {...props}
                    onRegisterFormSubmit={this.onLoginRegisterFormSubmit}
                  />
                );
              }}
            />
            <Route
              exact
              path="/login"
              render={props => {
                return (
                  <LoginPage
                    {...props}
                    onLoginFormSubmit={this.onLoginRegisterFormSubmit}
                  />
                );
              }}
            />
            <PrivateRoute exact path="/bookmarks" component={BookmarksPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  { setAuthToken }
)(App);
