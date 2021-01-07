import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { appointmentThunk } from "../Store/Reducers/AppointmentReducers";
import { closeAppointmentModel } from "../Store/Slices/siteSlice";

class Popup extends Component {
  constructor(props) {
    super();

    this.state = {
      show: props.show,
      date: props.form_edit.date ?? new Date(),
    };
  }
  ConvertToDatetimeHtmlValue = (date) => date.toJSON().replace(/\.[^Z]+Z/, "");

  handelSubmit = (e) => {
    const { mode, id } = this.props.form_edit;
    var value = e.target[0].value;
    if (mode === "new") {
      this.props.onSave(value);
    } else {
      this.props.onSave(id, value);
    }
    this.props.closeAppointmentModel();
    e.preventDefault();
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
