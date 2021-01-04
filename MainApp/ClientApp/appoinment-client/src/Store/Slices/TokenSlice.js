import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginModel } from "../../Services/AuthService/AuthModel";
import auth from "../../Services/AuthService/AuthService";

export const fetchTokenByCredentials = createAsyncThunk(
  "token/fetchTokenByCredentials",
  async (username, password, thunkAPI) => {
    let login_model = new LoginModel(username, password);
    const response = await auth.getTokenByLoginCredentials(login_model);
    return response.data;
  }
);

// Then, handle actions in your reducers:
const tokenSlice = createSlice({
  name: "token",
  initialState: {
    tokenResponse: null,
    isLoaded: false,
    isFail: false,
    isConnected: false,
    register: false,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    registerOpen(state) {
      state.register = true;
    },
    registerClose(state) {
      state.register = false;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchTokenByCredentials.pending]: (state, action) => {
      // Add user to the state array
      state.isLoaded = false;
    },
    [fetchTokenByCredentials.fulfilled]: (state, action) => {
      // Add user to the state array
      state.isLoaded = false;
      state.tokenResponse = action.payload;
    },
    [fetchTokenByCredentials.rejected]: (state, action) => {
      // Add user to the state array
      state.isFail = true;
    },
  },
});
export const {
  registerOpen,
  registerClose,
  incrementByAmount,
} = tokenSlice.actions;
export default tokenSlice.reducer;
