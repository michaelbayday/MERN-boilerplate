import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import App from "./components/App";
import NotFound from "./components/NotFound";

import HomeContainer from "./containers/HomePage";
import UserManageAppointmentsContainer from "./containers/UserManageAppointments";
import AdminPage from "./containers/AdminPage";

import "./styles/styles.scss";

render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route
            exact
            path="/myappointments"
            component={UserManageAppointmentsContainer}
          />
          <Route exact path="/admin" component={AdminPage} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById("app")
);
