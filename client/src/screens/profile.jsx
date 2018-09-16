import React from "react";

import auth from "../services/auth";
import { NavLink } from "react-router-dom";

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: {},
            authToken: "",
            error: "",
            url: "",
            username: "",
            bio: ""
        };
    }

    componentDidMount() {
        this.fetchUserId();
    }

    fetchUserId() {
        return fetch("/profile", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Access: auth.getToken()
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    username: json.username,
                    bio: json.bio,
                    avatar: json.avatar,
                    thumb: json.avatar.thumb,
                    url: json.avatar.thumb.url
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <div>{this.state.username}</div>
                <div>{this.state.bio}</div>
                <div>
                    <img src={this.state.url} alt="" />
                </div>

                <NavLink to="/profile/edit" className="link">
                    Edit Profile
                </NavLink>
            </div>
        );
    }
}

export default User;
