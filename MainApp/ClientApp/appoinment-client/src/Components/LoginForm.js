import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { LoginModel } from "../Services/AuthService/AuthModel";
import { registerOpen } from "../Store/Slices/siteSlice";
import { Redirect } from "react-router-dom";
import { authThunk } from "../Store/Reducers/authReducers";

class LoginForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isFail: props.isFail,
      errorMsg: null,
      isAuth: false,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.isAuth !== state.isAuth) {
      return {
        isAuth: props.isAuth,
      };
    } else return null;
  }
  handleSubmit = (event) => {
    const form = event.currentTarget;
    this.props.login(form[0].value, form[1].value);
    event.preventDefault();
  };
  handleRegister = (event) => {
    this.props.registerOpen();
  };
  render() {
    const { isAuth } = this.props;
    const style = {
      width: "300px",
      margin: "auto",
      background: "rgb(89 99 102 / 23%)",
    };
    return !isAuth ? (
      <div className="card p-3" style={style}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Row>
            <Col>
              <Button type="submit">Sign-In</Button>
            </Col>
            <Col>
              <Button
                className="float-right"
                type="button"
                onClick={this.handleRegister}
              >
                Sign-up
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    ) : (
      <Redirect to="homepage"></Redirect>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFail: state.token.isFail,
    errorMsg: state.token.errorMsg,
    isAuth: state.token.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerOpen: () => dispatch(registerOpen()),
    login: (username, password) => {
      let login_model = new LoginModel(username, password);
      return dispatch(authThunk.login(login_model));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
