import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { registerOpen } from "../Store/Slices/TokenSlice";
class LoginForm extends React.Component {
  constructor(props) {
    super();
  }
  handleSubmit(event) {
    var form = event.currentTarget;
  }
  handleRegister = (event) => {
    var form = event.currentTarget;

    this.props.registerOpen();
  };
  render() {
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
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return { registerOpen: () => dispatch(registerOpen()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
