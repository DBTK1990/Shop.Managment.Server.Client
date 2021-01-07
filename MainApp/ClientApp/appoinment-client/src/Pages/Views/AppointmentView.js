import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import Popup from "../../Components/Popup";
import Table from "../../Components/TableControl/MyTable";
import { appointmentThunk } from "../../Store/Reducers/AppointmentReducers";
import { openAppointmentModel } from "../../Store/Slices/siteSlice";

class AppointmentView extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.pager(1);
  }

  render() {
    const {
      row_data,
      page_count,
      create,
      appointment_model,
      edit,
    } = this.props;
    return (
      <div>
        <Popup
          show={appointment_model.show}
          mode={appointment_model.mode}
          onSave={appointment_model.mode === "new" ? create : edit}
        />
        <Button
          onClick={() => {
            this.props.openAppointmentModel("new", null, null);
          }}
        >
          Create new Appointment
        </Button>
        <Table
          {...this.props}
          row_data={row_data ?? []}
          page_count={page_count ?? 1}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  row_data: state.token.rows_data.appointment_list,
  page_count: state.token.rows_data.page_count,
  appointment_model: state.token.appointment_model,
});

const mapDispatchToProps = (dispatch) => {
  return {
    pager: (page_num) => dispatch(appointmentThunk.pager(page_num)),
    details: (id) => dispatch(appointmentThunk.details(id)),
    create: (date) => dispatch(appointmentThunk.create(date)),
    edit: (id, date) => dispatch(appointmentThunk.edit({ id, date })),
    delete: (id) => dispatch(appointmentThunk.delete(id)),
    openAppointmentModel: (mode, id, date) =>
      dispatch(openAppointmentModel({ mode, id, date })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentView);
