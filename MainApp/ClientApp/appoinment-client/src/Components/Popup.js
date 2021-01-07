import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { appointmentThunk } from "../Store/Reducers/AppointmentReducers";
import { closeAppointmentModel } from "../Store/Slices/siteSlice";
import datetime from "date-and-time";

class Popup extends Component {
  constructor(props) {
    super();

    this.state = {
      show: props.show,
      date: props.mode === "new" ? new Date() : props.form_edit.date,
    };
  }
  ConvertToDatetimeHtmlValue = (date) =>
    datetime.format(date, "YYYY-MM-DDTHH:mm:ss");

  handelSubmit = (e) => {
    const { mode, form_edit } = this.props;
    var value = e.target[0].value;
    if (mode === "new") {
      this.props.onSave(value);
    } else {
      this.props.onSave(form_edit.id, this.state.date);
    }
    this.props.closeAppointmentModel();
    e.preventDefault();
  };
  handleChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ date: new Date(value) });
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.props.closeAppointmentModel();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            appointment number {this.props.form_edit.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handelSubmit}>
            <Form.Group controlId="formGroupSetDate">
              <Form.Label>Set The Desired Date:</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Date"
                onChange={this.handleChange}
                value={this.ConvertToDatetimeHtmlValue(this.state.date)}
              />
            </Form.Group>
            <Form.Group controlId="submit_button">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  form_edit: state.token.appointment_model.form,
});

const mapDispatchToProps = (dispatch) => {
  return {
    create: (date) => dispatch(appointmentThunk.create(date)),
    edit: (date) => dispatch(appointmentThunk.edit(date)),

    closeAppointmentModel: () => dispatch(closeAppointmentModel()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
