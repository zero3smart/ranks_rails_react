
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/auth";


const auth_token = "auth_token";

class Signup extends Component {
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

   storeToken(authToken) {
		try {
			localStorage.setItem("auth_token", auth_token);

			console.log("Token was stored successfull ");
		} catch (error) {
			console.log("Something went wrong");
		}
	}

    updateUsername(e) {
		this.setState({ username: e.target.value });
	}
	updateEmail(e) {
		this.setState({ email: e.target.value });
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
					email: this.state.email
					
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
			return <Redirect to="/posts" />;
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
							type="input"
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
				
				</div>
				<footer>
					<button onClick={this.signUp.bind(this)}>Sign Up</button>
				</footer>

				<div> {errorsText}</div>
			</div>
		);
	}


}

export default Signup;