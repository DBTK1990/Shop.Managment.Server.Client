import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import { closeLogout, logout } from "../Store/Slices/siteSlice";
import { push } from "connected-react-router";
class LogOut extends React.Component {
  close = (e) => {
    this.props.closeLogout();
  };
  approve = (e) => {
    this.props.logout();
    push("/login");
    this.props.closeLogout();
  };
  render() {
    const { show } = this.props;
    return (
      <Modal show={show} onHide={this.close} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>are you sure you want to log out from the system?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.approve}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    closeLogout: () => dispatch(closeLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
