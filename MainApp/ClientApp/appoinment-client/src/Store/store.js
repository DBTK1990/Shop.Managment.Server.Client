import { createStore } from "redux";
import { countReducer } from "./Slices/TokenSlice";

export const store = createStore(countReducer);
