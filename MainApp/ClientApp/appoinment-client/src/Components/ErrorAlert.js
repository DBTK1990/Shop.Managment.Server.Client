import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { closeError } from "../Store/Slices/siteSlice";

class ErrorAlert extends Component {
  constructor(props) {
    super();
  }
  handelClose = () => {
    this.props.closeError();
  };
  render() {
    return this.props.show ? (
      <Alert onClose={this.handelClose} dismissible variant="danger">
        <p>{this.props.error_model.body}</p>
      </Alert>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  error_model: state.token.error_model,
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeError: () => dispatch(closeError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert);
