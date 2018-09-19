import React, { Component } from "react";
import NotificationSystem from 'react-notification-system';

//const token

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "",
      password: "",
      password_confirmation: "",
      password_reset_token: "",
      
      _notificationSystem: null
    };
  }

 componentDidMount() {
        
         this._notificationSystem = this.refs.notificationSystem;
        this.fetchToken();
        console.log(this.props.match.params.password_reset_token);
    }

  



  _addNotification(event) {

        event.preventDefault();
        this._notificationSystem.addNotification({
            message: 'Danger!',
            level: 'error',
            position: 'tc'
        });
    }




  fetchToken() {
          

  fetch("/password_resets/" + this.props.match.params.id + "/edit", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    id: json.email,
                    //avatar: json.avatar
                    //thumb: json.avatar.thumb,
                    //url: json.avatar.thumb.url
                });
            })
            .catch(error => {
                console.error(error);
            });
    }



submiStPasssword() {
  fetch("/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
     
      
          password: this.state.password,
           password_confirmation: this.state.password_confirmation
       
      })
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.setState({ redirectToLogin: true });
        } else {
          return response.json();
          let errors = response.json();
          throw errors;
        }
      })
      .then(response => {
        this.setState({
          error: response
        });
      })
      .catch(err => {});
 }

async submitPasssword() {
        // this.setState({showProgress: true})
        try {
            let response = await fetch("/password_resets/" + this.props.match.params.id, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                  user: {
                   
                    password: this.state.password,
                    password_confirmation: this.state.password_confirmation
                  }
                    
                })
            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
               
               this._notificationSystem.addNotification({
                 message: 'Password has been reset.',
                level: 'success',
                position: 'tc'
            });
            } else {
                let error = res;
               // throw error;

                this._notificationSystem.addNotification({
                message: 'Password not present, please check and try again',
                level: 'error',
                position: 'tc'
            });
                
            }
        } catch (error) {
            //this.setState({ error: error });
            console.log( error);
            // this.setState({ showProgress: false });
        }
    }


    updatePassword(e) {
    this.setState({ password: e.target.value });
  }
    updatePasswordConfirmation(e) {
    this.setState({ password_confirmation: e.target.value });
  }


  render() {


    return (
      <div className="form">
        <header>Reset</header>
        <div>
        
                <NotificationSystem ref="notificationSystem" noAnimation={true}/>
            </div>
        <div className="body">
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.updatePassword.bind(this)}
            />
          </div>

           <div className="form-group">
            <label htmlFor="password_confirmation">Password Confirmation: </label>
            <input
              type="password"
              id="password_confirmation"
              value={this.state.password_confirmation}
              onChange={this.updatePasswordConfirmation.bind(this)}
            />
          </div>
        </div>

        <footer>
          <button onClick={this.submitPasssword.bind(this)}>
            Reset Password
          </button>
        </footer>
      </div>
    );
  }


}

export default ResetPassword;