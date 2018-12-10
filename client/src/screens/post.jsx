
import React, { Component } from "react";
import { Redirect } from "react-router-dom";



class Post extends Component {
	constructor() {
		super();

		this.state = {
			title: "",
			body: "",
			errors: false,
		   redirectToPosts: false,

		
			
		};
	}

	 componentDidMount() {
      //  this.fetchUser();
    }

   

    updateTitle(e) {
		this.setState({ title: e.target.value });
	}
	updateBody(e) {
		this.setState({ body: e.target.value });
	}

	


    fetdchUser() {
        return fetch("/posts/new", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
               
            }
        })
            .then(response => response.json())
            .then(json => {
                
            })
            .catch(error => {
                console.error(error);
            });
    }

	

	postForm() {
		fetch("/posts", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				 
			},
			body: JSON.stringify({
				post: {
					title: this.state.title,
					body: this.state.body
					
				}
			})
		})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					this.setState({ redirectToPosts: true });
				
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

		

		return (
			<div className="form">
				<header>Post</header>
				<div className="body">
					<div className="form-group">
						<label htmlFor="title">Title: </label>
						<input
							type="title"
							id="title"
							value={this.state.title}
							onChange={this.updateTitle.bind(this)}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="body">Body: </label>
						<input
							type="body"
							id="body"
							value={this.state.body}
							onChange={this.updateBody.bind(this)}
						/>
					</div>
				
				</div>
				<footer>
					<button onClick={this.postForm.bind(this)}>Post</button>
				</footer>

				<div> {errorsText}</div>
			</div>
		);
	}


}

export default Post;