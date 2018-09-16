import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/auth";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			//error: "",
			//errors: "",
			redirectToLogin: false,
			redirectToHome: false,

			error: null
		};
	}

	componentWillReceiveProps(nextProp) {}

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

				<div>{this.state.errors}</div>

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
					//return response.json();
					//throw new Error("Something went wrong ...");
				} else {
					this.setState({ redirectToHome: true });
				}
			})

			.catch(error => this.setState({ error }));
	}
}
