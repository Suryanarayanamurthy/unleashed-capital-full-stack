import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome to homepage!</b>
            </h4>
            <h4 style={{margin: "5rem 0"}}>Challenge: Simple app for <b>register, login, logout</b> functionality.</h4>
            <div className="col s12">
              <Link
                to="/register"
                className="btn landingBtn"
              >
                Register
              </Link>
            </div>
            <div className="col s12">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  border: "1px solid",
                  marginTop: "1rem",
                }}
                className="btn btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
