import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import ErrorAlert from "../../Components/ErrorAlert";

import Popup from "../../Components/Popup";
import Table from "../../Components/TableControl/MyTable";
import { appointmentThunk } from "../../Store/Reducers/AppointmentReducers";
import { openAppointmentModel } from "../../Store/Slices/siteSlice";

class AppointmentView extends Component {
  constructor(props) {
    super();
  }
  openCreateAppointment = () => {
    this.props.openAppointmentModel("new", null, null);
  };
  render() {
    const { row_data, create, appointment_model, edit, showError } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <Button className="my-4" onClick={this.openCreateAppointment}>
              Create new Appointment
            </Button>
          </Col>
        </Row>
        <Row>
          <Table align="center" {...this.props} />
        </Row>
        <Popup
          row_data={row_data ?? []}
          show={appointment_model.show}
          mode={appointment_model.mode}
          onSave={appointment_model.mode === "new" ? create : edit}
        />
        <ErrorAlert show={showError} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  row_data: state.token.rows_data.appointment_list,
  page_count: state.token.rows_data.page_count,
  appointment_model: state.token.appointment_model,
  showError: state.token.error_model.show,
});

const mapDispatchToProps = (dispatch) => {
  return {
    pager: (page_num, filter, order) =>
      dispatch(appointmentThunk.pager({ page_num, filter, order })),
    create: (date) => dispatch(appointmentThunk.create(date)),
    edit: (id, date) => dispatch(appointmentThunk.edit({ id, date })),
    delete: (id) => dispatch(appointmentThunk.delete(id)),
    openAppointmentModel: (mode, id, date) =>
      dispatch(openAppointmentModel({ mode, id, date })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentView);
