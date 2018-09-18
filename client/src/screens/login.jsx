
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/auth";
import NotificationSystem from 'react-notification-system';

 class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: "",
			redirectToLogin: false,
			redirectToHome: false,
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

	updateEmail(e) {
		this.setState({ email: e.target.value });
	}

	updatePassword(e) {
		this.setState({ password: e.target.value });
	}

	pressLogin() {
		return auth
			.login(this.state.email, this.state.password)
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
				from: { pathname: "/users" }
			};
			return <Redirect to={from} />;
		}
		if (this.state.redirectToHome) {
			// console.log('asdasdasd')
			return <Redirect to="/users" />;
		}

		return (
			<div className="form">
				<header>Login -{this.state.error}</header>

			 <NotificationSystem ref="notificationSystem" noAnimation={true}/>

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
					<div className="form-group">
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							id="password"
							value={this.state.password}
							onChange={this.updatePassword.bind(this)}
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