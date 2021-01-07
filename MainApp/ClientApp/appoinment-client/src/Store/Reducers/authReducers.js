import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../../Services/AuthService/AuthService";

export const authThunk = {
  login: createAsyncThunk("token/login", async (login_model, thunkAPI) => {
    try {
      var response = await auth.getTokenByLoginCredentials(login_model);
      return {
        token: response.data,
        username: login_model.username,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
  register: createAsyncThunk(
    "token/register",
    async (register_model, thunkAPI) => {
      try {
        await auth.Register(register_model);
        thunkAPI.dispatch(authThunk.login(register_model));
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
  ),
  isValid: createAsyncThunk("token/valid", async (token, thunkAPI) => {
    try {
      var response = await auth.isTokenValid(token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }),
};

const authExtraReducer = {
  [authThunk.login.fulfilled]: (state, action) => {
    // Add user to the state array

    state.tokenResponse = action.payload.token;
    state.username = action.payload.username;

    state.isAuthenticated = true;
  },
  [authThunk.login.rejected]: (state, action) => {
    // Add user to the state array
    debugger;
    const { data } = action.payload.response;

    state.error_model.show = true;
    state.error_model.heading = `${data.title}`;
    state.error_model.body = data.errorData
      ? data.errorData.join("\n")
      : data.title ?? data.message;
  },
  [authThunk.register.rejected]: (state, action) => {
    // Add user to the state array

    const { data } = action.payload.response;

    state.error_model.show = true;
    state.error_model.heading = `${data.title}`;
    state.error_model.body = data.errorData
      ? data.errorData.join("\n")
      : data.title ?? data.message;
    //state.errorMsg = action.payload.message;
  },
};
export default authExtraReducer;
