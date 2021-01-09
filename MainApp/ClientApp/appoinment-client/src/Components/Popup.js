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
      changed: false,
    };
  }
  ConvertToDatetimeHtmlValue = (date) =>
    datetime.format(date, "YYYY-MM-DDTHH:mm:ss");

  static getDerivedStateFromProps(props, state) {
    let res = null;
    const dateNow = new Date();
    if (
      props.form_edit.date &&
      props.form_edit.date !== state.date &&
      !state.changed
    ) {
      res = {
        date: props.form_edit.date,
      };
    } else if (state.date && state.date !== dateNow && !state.changed) {
      res = { date: dateNow };
    } else if (state.changed) {
      res = { changed: false };
    } else {
      res = null;
    }
    return res;
  }

  handelSubmit = (e) => {
    const { mode, form_edit } = this.props;
    const { date } = this.state;
    if (mode === "new") {
      this.props.onSave(date);
    } else {
      this.props.onSave(form_edit.id, date);
    }
    this.props.closeAppointmentModel();
    e.preventDefault();
  };
  handleChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ date: new Date(value), changed: true });
  };
  handleHide = () => {
    this.props.closeAppointmentModel();
  };
  render() {
    const { date } = this.state;
    const { show, form_edit, mode } = this.props;

    return (
      <Modal show={show} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode} appointment {mode === "edit" ? `number ${form_edit.id}` : ""}
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
                value={this.ConvertToDatetimeHtmlValue(date)}
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
