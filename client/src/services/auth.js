import React from "react";
import {  Redirect } from "react-router";
let auth_token = window.localStorage.getItem("auth_token");

export default {
    isAuthenticated() {
        auth_token = window.localStorage.getItem("auth_token");

        return auth_token != null;
    },

    getToken() {
        return auth_token;
    },

    login(username, password) {
        return fetch("/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username

            })
        })
            .then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    return resp.text();
                } else {
                    throw resp.json();
                }
            })
            .then(response => {
                if (!response.status) {
                    window.localStorage.setItem("auth_token", response);
                    return {
                        login_status: true
                    };
                } else {
                    return {
                        login_status: false
                    };
                }
            })
            .catch(error => {
                console.log("Error" + error);
                return {
                    login_status: false
                };
            });
    },

    logout() {
        auth_token = null;
        window.localStorage.removeItem("auth_token");
        <Redirect to="/login" />;
    }
};
