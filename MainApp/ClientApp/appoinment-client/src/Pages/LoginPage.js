import React from "react";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import { connect } from "react-redux";
import ErrorAlert from "../Components/ErrorAlert";
import { Col, Row } from "react-bootstrap";
class LoginPage extends React.Component {
  constructor(props) {
    super();
    this.state = { register: false };
  }
  render() {
    let render;
    const { register, showError } = this.props;
    const style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      gap: "7px",
      position: "relative",
    };
    if (!register) {
      render = <LoginForm></LoginForm>;
    } else {
      render = <RegisterForm></RegisterForm>;
    }
    return (
      <div style={style}>
        <Row>
          <Col>{render}</Col>
        </Row>
        <ErrorAlert show={showError} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    register: state.token.register_model,
    showError: state.token.error_model.show,
  };
};

export default connect(mapStateToProps)(LoginPage);
