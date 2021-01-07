import React from "react";
import { Component } from "react";
import { Route, Switch } from "react-router";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import ProtectedPages from "./ProtectedPages";

class router extends Component {
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

export default router;
