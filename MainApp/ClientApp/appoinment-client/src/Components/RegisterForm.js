import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { registerClose } from "../Store/Slices/TokenSlice";
class RegisterForm extends React.Component {
  constructor(props) {
    super();
  }
  handelSubmit(event) {
    var form = event.currentTarget;
  }
  CloseRegister = (e) => {
    this.props.registerClose();
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
        <Form onSubmit={this.handelSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>שם משתמש</Form.Label>
            <Form.Control type="text" placeholder="הכנס שם משתמש" />
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>אימייל</Form.Label>
            <Form.Control type="email" placeholder="הכנס אימייל" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control type="password" placeholder="סיסמא" />
          </Form.Group>
          <Form.Row>
            <Col lg="6">
              <Button style={{ fontSize: "15px" }} type="submit">
                הרשם למערכת
              </Button>
            </Col>
            <Col>
              <Button
                style={{ fontSize: "15px" }}
                className="float-left"
                type="button"
                onClick={this.CloseRegister}
              >
                חזור
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
  return { registerClose: () => dispatch(registerClose()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
