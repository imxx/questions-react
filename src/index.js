import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from "redux-promise";
import reducers from './reducers';
import routes from "./routes";
import { fetchState, handleServerSocketMessage } from "./actions/index";

import socketMiddleware from "./middlewares/socketMiddleware";
import io from "socket.io-client";
const socket = io("/");

import toastr from "toastr";
import toastrMiddleware from "./middlewares/toastrMiddleware";

const createStoreWithMiddleware = applyMiddleware(
	promise,
	socketMiddleware(socket),
	toastrMiddleware(toastr)
)(createStore);

const store = createStoreWithMiddleware(reducers);

socket.on("server", data => {
	console.log("On server, data: ", data);
	store.dispatch(handleServerSocketMessage(data));
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById("react_app"));
