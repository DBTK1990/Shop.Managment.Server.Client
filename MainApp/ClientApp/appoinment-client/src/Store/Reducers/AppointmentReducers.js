import { createAsyncThunk } from "@reduxjs/toolkit";
import appointment_api from "../../Services/AppointmentService";

export const appointmentThunk = {
  pager: createAsyncThunk(
    "appointment/pager",
    async ({ page_num, filter_o, order_o }, thunkAPI) => {
      try {
        const { tokenResponse, pagerQuery } = thunkAPI.getState().token;
        var api = new appointment_api(tokenResponse.token);
        var filter = filter_o ? filter_o : pagerQuery.filter;
        var order = order_o ? order_o : pagerQuery.order;
        var response = await api.getListByPage(page_num, filter, order);
        return {
          data: response.data,
          page_num,
        };
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
  ),
  details: createAsyncThunk("appointment/details", async (id, thunkAPI) => {
    try {
      const { tokenResponse, pagerQuery } = thunkAPI.getState().token;
      var api = new appointment_api(tokenResponse.token);
      var response = await api.getDetailsById(id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  create: createAsyncThunk("appointment/create", async (date, thunkAPI) => {
    try {
      const {
        tokenResponse,
        pagerQuery,
        table_page_num,
      } = thunkAPI.getState().token;
      var api = new appointment_api(tokenResponse.token);
      var response = await api.create(date);
      thunkAPI.dispatch(
        appointmentThunk.pager({
          page_num: table_page_num,
          filter: pagerQuery.filter,
          order: pagerQuery.order,
        })
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  edit: createAsyncThunk("appointment/edit", async ({ id, date }, thunkAPI) => {
    try {
      const {
        tokenResponse,
        pagerQuery,
        table_page_num,
      } = thunkAPI.getState().token;
      var api = new appointment_api(tokenResponse.token);
      var response = await api.edit(id, date);
      thunkAPI.dispatch(
        appointmentThunk.pager({
          page_num: table_page_num,
          filter: pagerQuery.filter,
          order: pagerQuery.order,
        })
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  delete: createAsyncThunk("appointment/delete", async (id, thunkAPI) => {
    try {
      var { token, pagerQuery, table_page_num } = thunkAPI.getState();
      var api = new appointment_api(token.tokenResponse.token);
      var response = await api.delete(id);
      thunkAPI.dispatch(
        appointmentThunk.pager({
          page_num: table_page_num,
          filter: pagerQuery.filter,
          order: pagerQuery.order,
        })
      );
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
    var data = action.payload.response;
    state.error_model.show = true;
    state.error_model.heading = `${data.title}`;
    state.error_model.body = data.error ?? data.message;
  },
  [appointmentThunk.delete.rejected]: (state, action) => {
    // Add user to the state array
    var data = action.payload.response.data;

    state.error_model.show = true;
    state.error_model.heading = `${data.title}`;
    state.error_model.body = data.error ?? data.message;
  },
  [appointmentThunk.edit.rejected]: (state, action) => {
    // Add user to the state array
    var data = action.payload.response.data;

    state.error_model.show = true;
    state.error_model.heading = `${data.title}`;
    state.error_model.body = data.error ?? data.message;
  },
  [appointmentThunk.create.rejected]: (state, action) => {
    // Add user to the state array
    var data = action.payload.response.data;

    state.error_model.show = true;
    state.error_model.heading = `${data.title}`;
    state.error_model.body = data.error ?? data.message;
  },
};
export default appointmentExtraReducer;
