import { combineReducers, createStore } from "redux";
import TokenReducer from "./Slices/TokenSlice";

const rootReducer = combineReducers({
  token: TokenReducer,
});

export const store = createStore(rootReducer);
