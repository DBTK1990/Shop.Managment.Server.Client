import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import TokenReducer from "./Slices/siteSlice";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const rootReducer = (history) =>
  combineReducers({
    token: TokenReducer,
    router: connectRouter(history),
  });

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history))

  // other store enhancers if any
);

export const store = createStore(rootReducer(history), enhancer);

//export const store = createStore(rootReducer, applyMiddleware(thunk));
