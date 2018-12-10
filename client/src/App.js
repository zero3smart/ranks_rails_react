import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./services/private_route";





import logo from "./assets/images/logo.svg";
import Header from "./screens/header";

import Login from "./screens/login";
import Signup from "./screens/signup";

import auth from "./services/auth";

import Post from "./screens/post";
import Posts from "./screens/posts";
import PostShow from "./screens/postshow";
import CommentBox from "./components/CommentBox";
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

            <PrivateRoute exact path="/posts" component={Posts} />

            <PrivateRoute exact path="/posts/new" component={Post} />

            <PrivateRoute exact path="/posts/:id" component={PostShow} />
            <PrivateRoute path="/posts/:post_id/comments" component={CommentBox} />
            <Route
              path="/login"
              render={props => (
                <Login {...props} updateAuth={this.updateAuth.bind(this)} />
              )}
            />

            <Route path="/signup" component={Signup} />



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