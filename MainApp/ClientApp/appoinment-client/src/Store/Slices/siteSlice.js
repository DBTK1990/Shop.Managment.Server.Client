import { createSlice } from "@reduxjs/toolkit";
import appointmentExtraReducer from "../Reducers/AppointmentReducers";
import authExtraReducer from "../Reducers/authReducers";

// Then, handle actions in your reducers:
const siteSlice = createSlice({
  name: "token",
  initialState: {
    tokenResponse: null,
    isAuthenticated: false,
    username: null,
    isFail: false,
    logout_model: false,
    register_model: false,
    appointment_model: {
      show: false,
      mode: "new",
      form: {
        id: null,
        date: null,
      },
    },
    error_model: {
      show: false,
      heading: null,
      body: null,
    },
    table_page_num: 1,
    errorMsg: null,
    rows_data: [],
    pagerQuery: {
      filter: "date",
      order: 1,
    },
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    registerOpen(state) {
      state.register_model = true;
    },
    registerClose(state) {
      state.register_model = false;
    },
    openLogout(state) {
      state.logout_model = true;
    },
    closeLogout(state) {
      state.logout_model = false;
    },
    openAppointmentModel(state, { payload }) {
      state.appointment_model.show = true;
      state.appointment_model.mode = payload.mode;
      state.appointment_model.form.id = payload.id;
      state.appointment_model.form.date = payload.date
        ? new Date(payload.date)
        : null;
    },
    closeAppointmentModel(state) {
      state.appointment_model.show = false;
      state.appointment_model.mode = "new";
      state.appointment_model.form.id = null;
      state.appointment_model.form.date = null;
    },
    showError(state, { payload }) {
      state.error_model.show = true;
      state.error_model.heading = payload.heading;
      state.error_model.body = payload.body;
    },
    closeError(state, { payload }) {
      state.error_model.show = false;
      state.error_model.heading = null;
      state.error_model.body = null;
    },
    filterTableToggle(state, { payload }) {
      if (state.pagerQuery.filter !== payload) {
        state.pagerQuery.filter = payload;
      }
      state.pagerQuery.order = state.pagerQuery.order === 1 ? 0 : 1;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.tokenResponse = null;
    },
  },
  extraReducers: { ...authExtraReducer, ...appointmentExtraReducer },
});
export const {
  registerOpen,
  registerClose,
  openLogout,
  closeLogout,
  openAppointmentModel,
  closeAppointmentModel,
  logout,
  showError,
  closeError,
  filterTableToggle,
} = siteSlice.actions;
export default siteSlice.reducer;
