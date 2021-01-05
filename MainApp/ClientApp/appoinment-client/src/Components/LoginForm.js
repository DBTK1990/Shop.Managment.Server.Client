import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { LoginModel } from "../Services/AuthService/AuthModel";
import { registerOpen, login } from "../Store/Slices/siteSlice";
class LoginForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isFail: props.isFail,
      errorMsg: null,
    };
  }
  static getDerivedStateFromProps(props, state) {
    return { isFail: props.isFail, errorMsg: props.errorMsg };
  }
  handleSubmit = (event) => {
    var form = event.currentTarget;
    this.props.login(form[0].value, form[1].value);
    event.preventDefault();
  };
  handleRegister = (event) => {
    var form = event.currentTarget;

    this.props.registerOpen();
  };
  render() {
    console.log(this.props);
    return (
      <div
        className="card p-3"
        style={{
          width: "300px",
          margin: "auto",
          textAlign: "right",
          direction: "rtl",
          background: "rgb(89 99 102 / 23%)",
        }}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>שם משתמש</Form.Label>
            <Form.Control type="text" placeholder="הכנס שם משתמש" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control type="password" placeholder="סיסמא" />
          </Form.Group>
          <Form.Row>
            <Col lg="6">
              <Button type="submit">כניסה</Button>
            </Col>
            <Col>
              <Button
                className="float-left"
                type="button"
                onClick={this.handleRegister}
              >
                הרשמה
              </Button>
            </Col>
          </Form.Row>
          <Form.Row style={{ display: this.state.isFail ? "flex" : "none" }}>
            <Col lg="6">
              <p>{this.state.errorMsg}</p>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFail: state.token.isFail,
    errorMsg: state.token.errorMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerOpen: () => dispatch(registerOpen()),
    login: (username, password) => {
      var login_model = new LoginModel(username, password);
      return dispatch(login(login_model));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
