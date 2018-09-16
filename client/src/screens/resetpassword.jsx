import React from "react";

import auth from "../services/auth";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      error: ""
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    return fetch("/password_resets/:id/edit", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          password: json.password
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  updatePassword() {
    fetch("/password_resets/:id", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: this.state.password
      })
    })
      .then(aa => {
        if (aa.status == 201) {
          this.setState({ password: this.state.password });
        } else {
          return aa.json();
        }
      })
      .then(response => {
        this.setState({
          errors: response
        });
      })
      .catch(err => {});
  }

  render() {
    return (
      <div className="form">
        <header>Edit password -{this.state.error}</header>

        <div className="form-group">
          <label htmlFor="password">password: </label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.updatePassword.bind(this)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Confirm">Confirm: </label>
          <textarea
            type="confirm"
            id="confirm"
            value={this.state.confirm}
            onChange={this.updateConfirm.bind(this)}
          />
        </div>

        <footer>
          <button onClick={this.updatePasswors.bind(this)}>
            Update Password
          </button>
        </footer>
      </div>
    );
  }
}

export default ResetPassword;
