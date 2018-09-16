import React from "react";

import auth from "../services/auth";

import Dropzone from "react-dropzone";

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: "",
      avatar: {},
      authToken: "",
      error: "",
      url: ""
    };
  }

  componentDidMount() {
    this.fetchUser();
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
      .then(aa => {
        if (aa.status == 201) {
          this.setState({ bio: this.state.bio });
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
        <header>Edit User -{this.state.error}</header>

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
            type="bio"
            id="bio"
            value={this.state.bio}
            onChange={this.updateBio.bind(this)}
          />
        </div>

        <footer>
          <button onClick={this.updateUser.bind(this)}>Update Profile</button>
        </footer>
      </div>
    );
  }
}

export default EditUser;
