
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/auth";
import NotificationSystem from 'react-notification-system';

 class Login extends Component {
	constructor(props) {
		super(props);
		debugger;
		this.state = {
			username: "",


			error: "",
			redirectToLogin: false,
			redirectToHome: false,
			_notificationSystem: null


		};
		console.log(props);
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

	//updateEmail(e) {
	//	this.setState({ email: e.target.value });
	//}

	updateUsername(e) {
		this.setState({ username: e.target.value });
	}


	pressLogin() {
		return auth
			.login(this.state.username)
			.then(response => {
				this.props.updateAuth();
				//let res = response.text();

				if (response.login_status == false) {
				  this._notificationSystem.addNotification({
                 message: 'Email and password combination are invalid',
                level: 'error',
                position: 'tc'
            });
				} else {
					this.setState({ redirectToHome: true });
				}
			})

			.catch(error => console.log(error));
	}



	render() {
		// console.log(auth.isAuthenticated())
		if (auth.isAuthenticated()) {
			const { from } = this.props.location.state || {
				from: { pathname: "/posts" }
			};
			return <Redirect to={from} />;
		}
		if (this.state.redirectToHome) {
			// console.log('asdasdasd')
			return <Redirect to="/posts" />;
		}

		return (
			<div className="form">
				<header>Login -{this.state.error}</header>

			 <NotificationSystem ref="notificationSystem" noAnimation={true}/>

				<div className="body">



					<div className="form-group">
						<label htmlFor="username">Username: </label>
						<input
							type="username"
							id="username"
							value={this.state.username}
							onChange={this.updateUsername.bind(this)}
						/>
					</div>

				</div>

				<footer>
					<button onClick={this.pressLogin.bind(this)}>Login</button>
				</footer>
			</div>
		);
	}


}

export default Login;