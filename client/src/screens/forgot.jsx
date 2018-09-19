import React, { Component } from "react";
import NotificationSystem from 'react-notification-system';

class Forgot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			error: "",
			
			_notificationSystem: null
		};
	}

 componentDidMount() {
        
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


async submitEmail() {
        // this.setState({showProgress: true})
        try {
            let response = await fetch("password_resets", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   
                    email: this.state.email,
                    
                })
            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
               
               this._notificationSystem.addNotification({
                 message: 'Email sent with password reset instructions',
                level: 'success',
                position: 'tc'
            });
            } else {
                let error = res;
               // throw error;

                this._notificationSystem.addNotification({
                message: 'Email address not found. Please check and try again',
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


    updateEmail(e) {
		this.setState({ email: e.target.value });
	}

	render() {


		return (
			<div className="form">
				<header>Forgot</header>
				<div>
				
                <NotificationSystem ref="notificationSystem" noAnimation={true}/>
            </div>
				<div className="body">
					<div className="form-group">
						<label htmlFor="email">Email: </label>
						<input
							type="email"
							id="email"
							value={this.state.email}
							onChange={this.updateEmail.bind(this)}
						/>
					</div>
				</div>

				<footer>
					<button onClick={this.submitEmail.bind(this)}>
						Send password
					</button>
				</footer>
			</div>
		);
	}


}

export default Forgot;