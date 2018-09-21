import React, { Component } from "react";
import NotificationSystem from 'react-notification-system';

//const token

class UserConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
      confirmation_token: "",

      
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
          

  fetch("/users/" + this.props.match.params.id + "/confirm_email", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              
            }
        })
            .then(response => response.json())
            .then(json => {
                 this._notificationSystem.addNotification({
                 message: 'Account has been confirmed.',
                level: 'success',
                position: 'tc'
            });
            })
            .catch(error => {
                console.error(error);
            });
    }





 

  render() {


    return (
      <div className="form">
        <header>Confirmation</header>
        <div>
        
      <NotificationSystem ref="notificationSystem" noAnimation={true}/>
            </div>
      
      </div>
    );
  }


}

export default UserConfirmation;