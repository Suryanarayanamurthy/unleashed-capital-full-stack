import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontWeight: "500",
                fontSize: "1.1rem",
                lineHeight: "1.25",
                marginTop: "1.5rem",
                width: "100%"
              }}
              className="col s5 brand-logo center black-text"
            >
              UNLEASHED CAPITAL TEST - HASEEB
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
