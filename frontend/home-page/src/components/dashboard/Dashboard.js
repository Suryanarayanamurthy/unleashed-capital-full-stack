import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4 style={{fontWeight: '900'}}>
              Welcome {user.name}!
              <p className="flow-text grey-text text-darken-1" style={{
                margin: '10rem 0',
                fontWeight: '900',
              }}>
                To logout click <a href="/login" onClick={this.onLogoutClick}>here</a>
              </p>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
