import { createAsyncThunk } from "@reduxjs/toolkit";
import appointment_api from "../../Services/AppointmentService";
import { checkConnection, registerError } from "../Helpers/reduxUtil";
export const appointmentThunk = {
  pager: createAsyncThunk(
    "appointment/pager",
    async ({ page_num, filter_o, order_o }, thunkAPI) => {
      try {
        await checkConnection(thunkAPI);
        const { tokenResponse, pagerQuery } = thunkAPI.getState().token;
        const api = new appointment_api(tokenResponse.token);
        const filter = filter_o ? filter_o : pagerQuery.filter;
        const order = order_o ? order_o : pagerQuery.order;
        const response = await api.getListByPage(page_num, filter, order);
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
      await checkConnection(thunkAPI);
      const { tokenResponse } = thunkAPI.getState().token;
      const api = new appointment_api(tokenResponse.token);
      const response = await api.getDetailsById(id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  create: createAsyncThunk("appointment/create", async (date, thunkAPI) => {
    try {
      await checkConnection(thunkAPI);
      const {
        tokenResponse,
        pagerQuery,
        table_page_num,
      } = thunkAPI.getState().token;
      const api = new appointment_api(tokenResponse.token);
      const response = await api.create(date);
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
      await checkConnection(thunkAPI);
      const {
        tokenResponse,
        pagerQuery,
        table_page_num,
      } = thunkAPI.getState().token;
      const api = new appointment_api(tokenResponse.token);
      const response = await api.edit(id, date);
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
      await checkConnection(thunkAPI);
      const {
        tokenResponse,
        pagerQuery,
        table_page_num,
      } = thunkAPI.getState().token;
      const api = new appointment_api(tokenResponse.token);
      const response = await api.delete(id);
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
    let data = action.payload.response.data;
    registerError(state, data);
  },
  [appointmentThunk.delete.rejected]: (state, action) => {
    let data = action.payload.response.data;
    registerError(state, data);
  },
  [appointmentThunk.edit.rejected]: (state, action) => {
    let data = action.payload.response.data;
    registerError(state, data);
  },
  [appointmentThunk.create.rejected]: (state, action) => {
    let data = action.payload.response.data;
    registerError(state, data);
  },
};
export default appointmentExtraReducer;
