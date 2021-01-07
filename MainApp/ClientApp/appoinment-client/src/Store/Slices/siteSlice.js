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
    table_page_num: 1,
    errorMsg: null,
    rows_data: [],
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
      state.appointment_model.form.date = payload.date;
    },
    closeAppointmentModel(state) {
      state.appointment_model.show = false;
      state.appointment_model.mode = "new";
      state.appointment_model.form.id = null;
      state.appointment_model.form.date = null;
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
} = siteSlice.actions;
export default siteSlice.reducer;
