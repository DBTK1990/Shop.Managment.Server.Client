import { authThunk } from "../Reducers/authReducers";

export const checkConnection = async (thunkAPI) => {
  await thunkAPI.dispatch(authThunk.reinitConnection());
};
export const registerError = (state, data) => {
  if (data) {
    state.error_model.show = true;
    state.error_model.body = data.error ?? data.message;
  }
};

export const registerErrorAuth = (state, data) => {
  if (data) {
    state.error_model.show = true;
    state.error_model.heading = `${data.title}`;
    state.error_model.body = data.errorData
      ? data.errorData.join("\n")
      : data.title ?? data.message;
  }
};
