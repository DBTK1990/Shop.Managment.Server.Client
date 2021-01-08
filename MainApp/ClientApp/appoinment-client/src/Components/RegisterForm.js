import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { RegisterModel } from "../Services/AuthService/AuthModel";
import { authThunk } from "../Store/Reducers/authReducers";
import { registerClose } from "../Store/Slices/siteSlice";
class RegisterForm extends React.Component {
  constructor(props) {
    super();
  }
  handelSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    this.props.register(form[0].value, form[2].value, form[1].value);
  };
  CloseRegister = (e) => {
    this.props.registerClose();
  };
  render() {
    const { isAuth } = this.props;
    const style = {
      width: "300px",
      margin: "auto",
      background: "rgb(89 99 102 / 23%)",
      fontSize: "15px",
    };
    return !isAuth ? (
      <div className="card p-3" style={style}>
        <Form onSubmit={this.handelSubmit}>
          <Form.Group controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Row>
            <Col>
              <Button type="submit">register</Button>
            </Col>
            <Col>
              <Button
                className="float-right"
                type="button"
                onClick={this.CloseRegister}
              >
                back to login
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    ) : (
      <Redirect to="/homepage"></Redirect>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.token.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerClose: () => dispatch(registerClose()),
    register: (username, password, email) => {
      let register_model = new RegisterModel(username, password, email);
      return dispatch(authThunk.register(register_model));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
);
