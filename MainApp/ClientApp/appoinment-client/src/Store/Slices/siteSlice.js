import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginModel } from "../../Services/AuthService/AuthModel";
import auth from "../../Services/AuthService/AuthService";

export const login = createAsyncThunk(
  "token/login",
  async (login_model, thunkAPI) => {
    try {
      const response = await auth.getTokenByLoginCredentials(login_model);
      if (response.status === 401) {
        throw Error("שם משתמש או סיסמא אינם נכונים");
      }
      return response.json().data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Then, handle actions in your reducers:
const siteSlice = createSlice({
  name: "token",
  initialState: {
    tokenResponse: null,
    isLoaded: false,
    isFail: false,
    isAuthenticated: false,
    register: false,
    errorMsg: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    registerOpen(state) {
      state.register = true;
    },
    registerClose(state) {
      state.register = false;
    },
    showError(state, action) {
      state.isFail = true;
      state.errorMsg = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [login.pending]: (state, action) => {
      // Add user to the state array
      state.isFail = false;
      state.isLoaded = true;
    },
    [login.fulfilled]: (state, action) => {
      // Add user to the state array
      state.isLoaded = false;
      state.tokenResponse = action.payload;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      // Add user to the state array
      debugger;
      state.isFail = true;
      state.errorMsg = action.payload.message;
    },
  },
});
export const { registerOpen, registerClose, showError } = siteSlice.actions;
export default siteSlice.reducer;
