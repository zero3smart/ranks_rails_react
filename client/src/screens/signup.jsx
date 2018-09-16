import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/auth";

const auth_token = "auth_token";

export default class Signup extends React.Component {
	constructor() {
		super();

		this.state = {
			username: "",
			email: "",
			password: "",
			redirectToLogin: false,
			errors: false
		};
	}

	render() {
		let errorsText = [];
		if (this.state.errors != false) {
			for (var k in this.state.errors) {
				errorsText.push(
					<div key={k}>
						{k} : {this.state.errors[k][0]}
					</div>
				);
			}
		}

		if (auth.isAuthenticated()) {
			return <Redirect to="/users" />;
		}

		if (this.state.redirectToLogin) {
			return <Redirect to="/login" />;
		}

		return (
			<div className="form">
				<header>Sign Up</header>
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
					<button onClick={this.signUp.bind(this)}>Sign Up</button>
				</footer>

				<div> {errorsText}</div>
			</div>
		);
	}

	updateUsername(e) {
		this.setState({ username: e.target.value });
	}
	updateEmail(e) {
		this.setState({ email: e.target.value });
	}

	updatePassword(e) {
		this.setState({ password: e.target.value });
	}

	storeToken(authToken) {
		try {
			localStorage.setItem("auth_token", auth_token);

			console.log("Token was stored successfull ");
		} catch (error) {
			console.log("Something went wrong");
		}
	}

	signUp() {
		fetch("/users", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user: {
					username: this.state.username,
					email: this.state.email,
					password: this.state.password
				}
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
					errors: response
				});
			})
			.catch(err => {});
	}
}
