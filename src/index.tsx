import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {BingoTaskViewer} from "layouts/BingoTaskViewer";

// core components

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={BingoTaskViewer} />
      {/*<Redirect from="/" to="/admin/dashboard" />*/}
    </Switch>
  </Router>,
  document.getElementById("root")
);
