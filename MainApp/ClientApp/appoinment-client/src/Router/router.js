import React from "react";

import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";

export default function ProtectedPages(props) {
  let auth = useSelector((state) => state.token.isAuthenticated);

  return auth ? props.children : <Redirect to="/login" />;
}

export class AuthRouter extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/homepage">
          <ProtectedPages>
            <HomePage />
          </ProtectedPages>
        </Route>
        <Route path="*">
          <ProtectedPages>
            <HomePage />
          </ProtectedPages>
        </Route>
      </Switch>
    );
  }
}
