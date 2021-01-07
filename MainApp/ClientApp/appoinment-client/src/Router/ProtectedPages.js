import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export class ProtectedPages extends Component {
  render() {
    const { auth, children } = this.props;

    return auth 
     ? children : <Redirect to="/login" />;
  }
}

const mapStateToProps = (state) => ({ auth: state.token.isAuthenticated });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedPages);
