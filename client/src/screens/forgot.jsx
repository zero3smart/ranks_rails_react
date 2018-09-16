import React from "react";
import axios from "axios";

export default class Forgot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			error: "",
			success: ""
		};
	}

	componentWillReceiveProps(nextProp) {}

	render() {
		return (
			<div className="form">
				<header>Forgot {this.state.error}</header>
				<div>{this.state.success}</div>
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
					<button onClick={this.forgot.bind(this)}>
						Send password
					</button>
				</footer>
			</div>
		);
	}

	updateEmail(e) {
		this.setState({ email: e.target.value });
	}

	forgot() {
		axios
			.post("password/forgot", {
				headers: {
					//Accept: "application/json",
					"Content-Type": "application/json"
				},
				data: {
					email: this.state.email
				}
			})
			.then(response => {
				//let res = response.json();
				if (response.status >= 200 && response.status < 300) {
					//return response.json();
					//this.setState({ sucess: res });
				} else {
					//return response.json();
					//let error = response.json();

					this.setState({
						error: response.data
					});
				}
			})
			.catch(error => console.log(error));
	}

	lorgot() {
		fetch("password/forgot", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: this.state.email
			})
		})
			.then(response => {
				let res = response.json();
				if (response.status >= 200 && response.status < 300) {
					//this.setState({ success: this.state.success });
					//let res = "Success login";
					return response.json();
					this.setState({ sucess: res });
				} else {
					return response.json();

					this.setState({
						error: res
					});
				}
			})

			.catch(err => {
				console.log("Invalid credentials!");
				//this.setState({ error: res });
			});
	}
}
