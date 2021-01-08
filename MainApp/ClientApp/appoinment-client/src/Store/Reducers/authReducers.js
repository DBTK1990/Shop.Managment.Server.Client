import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../../Services/AuthService/AuthService";
import { registerErrorAuth } from "../Helpers/reduxUtil";

export const authThunk = {
  login: createAsyncThunk("token/login", async (login_model, thunkAPI) => {
    try {
      let response = await auth.getTokenByLoginCredentials(login_model);
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
  reinitConnection: createAsyncThunk(
    "token/reinitConnection",
    async (noUse, thunkAPI) => {
      try {
        const { tokenResponse } = thunkAPI.getState().token;
        const expiration = new Date(tokenResponse.expiration);
        const now = new Date();
        let response = null;
        if (tokenResponse && expiration >= now) {
          response = await auth.getTokenByRefreshToken(
            tokenResponse.refresh_token
          );
        }
        return response;
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
  ),
};

const authExtraReducer = {
  [authThunk.reinitConnection.fulfilled]: (state, action) => {
    if (action.payload.data) {
      state.tokenResponse = action.payload.data;
    }
  },
  [authThunk.login.fulfilled]: (state, action) => {
    state.tokenResponse = action.payload.token;
    state.username = action.payload.username;

    state.isAuthenticated = true;
  },
  [authThunk.login.rejected]: (state, action) => {
    const { data } = action.payload.response;

    registerErrorAuth(state, data);
  },
  [authThunk.register.rejected]: (state, action) => {
    const { data } = action.payload.response;

    registerErrorAuth(state, data);
  },
};
export default authExtraReducer;
