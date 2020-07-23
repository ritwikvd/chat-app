import React from "react";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const App = () => (
	<Router>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/chat" component={Chat} />
			<Redirect
				to={{
					pathname: "/",
				}}
			/>
		</Switch>
	</Router>
);

export default App;
