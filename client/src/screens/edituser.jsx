import React, { Component } from "react";


import auth from "../services/auth";

import Dropzone from "react-dropzone";
import NotificationSystem from 'react-notification-system';

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: "",
      avatar: {},
      authToken: "",
      error: "",
      url: "",
      _notificationSystem: null,
      original_password: "",
      new_password: "",
      new_password_confirmation: ""
    };
  }

  componentDidMount() {
          this.fetchUser();
         this._notificationSystem = this.refs.notificationSystem;
    }

    _addNotification(event) {

        event.preventDefault();
        this._notificationSystem.addNotification({
            message: 'Danger!',
            level: 'error',
            position: 'tc'
        });
    }



  fetchUser() {
    return fetch("/profile/edit", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Access: auth.getToken()
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          bio: json.bio,
          avatar: json.avatar,
          thumb: json.avatar.thumb,
          url: json.avatar.thumb.url
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updateBio(e) {
    this.setState({ bio: e.target.value });
  }
   updateOriginalPassword(e) {
    this.setState({ original_password: e.target.value });
  }

   updateNewPassword(e) {
    this.setState({ new_password: e.target.value });
  }

  updateNewPasswordConfirmation(e) {
    this.setState({ new_password_confirmation: e.target.value });
  }

  updateUser() {
    fetch("/profile/update", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Access: auth.getToken()
      },
      body: JSON.stringify({
        user: {
          bio: this.state.bio,
          email: this.state.email
        }
      })
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          this.setState({ bio: this.state.bio });
              this._notificationSystem.addNotification({
                 message: 'Account has been updated successfully',
                level: 'success',
                position: 'tc'
            });

        } else {
          //return resp.json();
            this._notificationSystem.addNotification({
                 message: 'Something went wrong',
                level: 'error',
                position: 'tc'
            });
        }
      })
     
      .catch(err => {});
  }



   updatePassword() {
    fetch("/profile/password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Access: auth.getToken()
      },
      body: JSON.stringify({
        user: {
          original_password: this.state.original_password,
          new_password: this.state.new_password,
           new_password_confirmation: this.state.new_password_confirmation
        }
      })
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          //this.setState({ bio: this.state.bio });
              this._notificationSystem.addNotification({
                 message: 'Successfully changed password.',
                level: 'success',
                position: 'tc'
            });

        } else {
          //return resp.json();
            this._notificationSystem.addNotification({
                 message: 'Something went wrong',
                level: 'error',
                position: 'tc'
            });
        }
      })
     
      .catch(err => {});
  }

  updateAvatar = files => {
    let formPayLoad = new FormData();
    formPayLoad.append("user[avatar]", files[0]);

    fetch("/profile/update", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Access: auth.getToken()
      },

      body: formPayLoad
    })
      // might be a good idea to put error handling here

      .then(response => response.json())
      .then(json => {
        // optionally, you can set the state of the component to contain the image
        // object itself that was returned from the rails controller, completing
        // the post cycle
        this.setState({ avatar: json.avatar });
      })
      .catch(error => {
        return error;
      });
  };

  render() {
    return (
      <div className="form">
        <header>Edit User</header>
         <NotificationSystem ref="notificationSystem" noAnimation={true}/>

        <div className="form-group">
          <img src={this.state.url} alt="" />

          <Dropzone
            accept="image/*"
            onDrop={this.updateAvatar}
            multiple={false}
            disablePreview={true}
          >
            <p>Try dropping some files here.</p>
          </Dropzone>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.updateEmail.bind(this)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Bio: </label>
          <textarea
            type="text"
            id="bio"
         
            value="This is a description."
            onChange={this.updateBio.bind(this)}
          />
        </div>

        <footer>
          <button onClick={this.updateUser.bind(this)}>Update Profile</button>
        </footer>


<div>Change Password</div>



        <div className="form-group">
          <label htmlFor="original_password">Current: </label>
          <input
          type="password"
            id="original_password"
            value={this.state.original_password}
            onChange={this.updateOriginalPassword.bind(this)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">New: </label>
          <input
            type="password"
            id="new_password"
            value={this.state.new_password}
            onChange={this.updateNewPassword.bind(this)}
          />
        </div>

         <div className="form-group">
          <label htmlFor="new_password_confirmation">Re-type new: </label>
          <input
          type="password"
            id="new_password_confirmation"
            value={this.state.new_password_confirmation}
            onChange={this.updateNewPasswordConfirmation.bind(this)}
          />
        </div>

<div><button onClick={this.updatePassword.bind(this)}>Update Password</button></div>
      </div>
    );
  }
}

export default EditUser;
