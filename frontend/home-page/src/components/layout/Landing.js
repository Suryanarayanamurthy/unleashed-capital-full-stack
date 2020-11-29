import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Unleashed Capital Test Homepage...
            </h4>
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
