import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import QuestionsList from "./components/QuestionsList";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={QuestionsList} />
		<Route path="page/:page" component={QuestionsList} />
		<Route path="*" component={QuestionsList} />
	</Route>
);