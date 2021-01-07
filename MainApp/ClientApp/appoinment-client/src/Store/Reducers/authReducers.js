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
        var response = await auth.Register(register_model);
        return response.data;
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
  // Add reducers for additional action types here, and handle loading state as needed
  [authThunk.login.pending]: (state, action) => {
    // Add user to the state array
    state.isFail = false;
  },
  [authThunk.login.fulfilled]: (state, action) => {
    // Add user to the state array

    state.tokenResponse = action.payload.token;
    state.username = action.payload.username;

    state.isAuthenticated = true;
  },
  [authThunk.login.rejected]: (state, action) => {
    // Add user to the state array
    state.isFail = true;
    state.errorMsg =
      action.payload.response.status === 400
        ? action.payload.response.data.errors.Username.join(",")
        : action.payload.response.data.errors.Password.join(",");
  },
  [authThunk.register.pending]: (state, action) => {
    // Add user to the state array
    debugger;
    state.isFail = false;
  },
  [authThunk.register.fulfilled]: (state, action) => {
    // Add user to the state array

    state.isAuthenticated = false;
  },
  [authThunk.register.rejected]: (state, action) => {
    // Add user to the state array
    debugger;
    state.isFail = true;
    state.errorMsg = action.payload.message;
  },
};
export default authExtraReducer;
