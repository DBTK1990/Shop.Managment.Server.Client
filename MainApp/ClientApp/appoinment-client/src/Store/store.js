import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import TokenReducer from "./Slices/siteSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  token: TokenReducer,
  //router: connectRouter(history),
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
