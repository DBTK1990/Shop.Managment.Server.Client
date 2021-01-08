import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { closeLogout, logout } from "../Store/Slices/siteSlice";
class LogOut extends React.Component {
  constructor(props) {
    super();
  }

  close = (e) => {
    this.props.closeLogout();
  };
  approve = (e) => {
    this.props.logout();
    this.props.history.push("/login");
    this.props.closeLogout();
  };
  render() {
    const { show } = this.props;
    return (
      <>
        <Modal
          show={show}
          onHide={this.close}
          backdrop="static"
          keyboard={true}
        >
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
      </>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogOut));
