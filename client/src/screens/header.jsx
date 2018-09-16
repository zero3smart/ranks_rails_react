import React from "react";
import { NavLink } from "react-router-dom";

//import auth from "../services/auth";

const AuthLinks = props => {
  return (
    <div className="toplinks">
      <div className="toplinks_inner">
        <a href="#" onClick={props.logout} className="link">
          Logout
        </a>

        <NavLink to="/profile" className="link">
          Profile
        </NavLink>
      </div>
    </div>
  );
};

const UnauthLinks = () => (
  <div className="toplinks">
    <div className="toplinks_inner">
      <NavLink to="/login" className="link">
        Login
      </NavLink>
      <NavLink to="/signup" className="link">
        Sign Up
      </NavLink>
      <NavLink to="/forgot" className="link">
        Forgot Your Password?
      </NavLink>
    </div>
  </div>
);

export default props => (
  <div className="header" id="header">
    <div className="header_base">
      <div className="topbar_inner">
        <div className="top_conf">
          <header>
            <div className="logo">App</div>

            {props.isAuthenticated ? (
              <AuthLinks logout={props.logout} />
            ) : (
              <UnauthLinks />
            )}
          </header>
        </div>
      </div>
    </div>
  </div>
);
