import {TaskViewerState} from "@utils/taskViewerState"
import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { createBrowserHistory } from "history"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import {BingoTaskViewer} from "@layouts/BingoTaskViewer"
import {configureStore} from "@stores/taskViewerStore"

// core components

import "@assets/css/material-dashboard-react.css?v=1.8.0"

const rootElement = document.getElementById("root")
const hist = createBrowserHistory()
const taskViewerStore = configureStore()

ReactDOM.render(
  <Provider store={taskViewerStore}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={BingoTaskViewer} />
        {/*<Redirect from="/" to="/admin/dashboard" />*/}
      </Switch>
    </Router>,
  </Provider>,
  rootElement
)
