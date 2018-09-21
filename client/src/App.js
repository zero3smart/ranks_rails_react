import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./services/private_route";

import "./assets/css/normalize.css";
import "./assets/css/header.css";
import logo from "./assets/images/logo.svg";
import Header from "./screens/header";
import Users from "./screens/users";
import Login from "./screens/login";
import Signup from "./screens/signup";
import Forgot from "./screens/forgot";
import ResetPassword from "./screens/resetpassword";
import Profile from "./screens/profile";
import EditUser from "./screens/edituser";
import auth from "./services/auth";
import UserConfirmation from "./screens/userconfirmation";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: auth.isAuthenticated()
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Header
            logout={this.logout.bind(this)}
            isAuthenticated={this.state.isAuthenticated}
          />

          <Switch>
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/edit" component={EditUser} />
            <Route
              path="/login"
              render={props => (
                <Login {...props} updateAuth={this.updateAuth.bind(this)} />
              )}
            />
            <Route path="/forgot" component={Forgot} />
            <Route path="/password_resets/:id/edit" component={ResetPassword} />
            <Route path="/signup" component={Signup} />
            <Route path="/users/:id/confirm_email" component={UserConfirmation} />
          </Switch>
        </div>
      </Router>
    );
  }

  updateAuth() {
    this.setState({
      isAuthenticated: auth.isAuthenticated()
    });
  }

  logout(e) {
    e.preventDefault();
    auth.logout();
    this.updateAuth();
  }
}

export default App;
