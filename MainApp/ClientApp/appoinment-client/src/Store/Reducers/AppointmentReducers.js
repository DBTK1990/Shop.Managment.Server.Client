import { createAsyncThunk } from "@reduxjs/toolkit";
import appointment_api from "../../Services/AppointmentService";

export const appointmentThunk = {
  pager: createAsyncThunk("appointment/pager", async (page_num, thunkAPI) => {
    try {
      var { tokenResponse } = thunkAPI.getState().token;
      var api = new appointment_api(tokenResponse.token);
      var response = await api.getListByPage(page_num);
      return {
        data: response.data,
        page_num,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  details: createAsyncThunk("appointment/details", async (id, thunkAPI) => {
    try {
      var { tokenResponse } = thunkAPI.getState().token;
      var api = new appointment_api(tokenResponse.token);
      var response = await api.getDetailsById(id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  create: createAsyncThunk("appointment/create", async (date, thunkAPI) => {
    try {
      var { tokenResponse, table_page_num } = thunkAPI.getState().token;
      var api = new appointment_api(tokenResponse.token);
      var response = await api.create(date);
      thunkAPI.dispatch(appointmentThunk.pager(table_page_num));

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  edit: createAsyncThunk("appointment/edit", async ({ id, date }, thunkAPI) => {
    try {
      var { tokenResponse } = thunkAPI.getState().token;
      var api = new appointment_api(tokenResponse.token);
      var response = await api.edit(id, date);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  delete: createAsyncThunk("appointment/delete", async (id, thunkAPI) => {
    try {
      var { tokenResponse, table_page_num } = thunkAPI.getState().token;
      var api = new appointment_api(tokenResponse.token);
      var response = await api.delete(id);
      thunkAPI.dispatch(appointmentThunk.pager(table_page_num));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
};

const appointmentExtraReducer = {
  [appointmentThunk.pager.pending]: (state, action) => {
    state.isFail = false;
  },
  [appointmentThunk.pager.fulfilled]: (state, action) => {
    state.rows_data = action.payload.data;
    state.table_page_num = action.payload.page_num;
  },
  [appointmentThunk.pager.rejected]: (state, action) => {
    // Add user to the state array
    state.isFail = true;
    state.errorMsg = "error in pager";
  },
  [appointmentThunk.details.pending]: (state, action) => {
    // Add user to the state array
    state.isFail = false;
  },
  [appointmentThunk.details.fulfilled]: (state, action) => {
    // Add user to the state array

    state.isAuthenticated = false;
  },
  [appointmentThunk.details.rejected]: (state, action) => {
    // Add user to the state array
    state.isFail = true;
    state.errorMsg = action.payload.message;
  },
};
export default appointmentExtraReducer;
