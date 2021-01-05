import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import TokenReducer from "./Slices/siteSlice";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  token: TokenReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

export const store = createStore(rootReducer, enhancer);

//export const store = createStore(rootReducer, applyMiddleware(thunk));
