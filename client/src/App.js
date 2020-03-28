import React from "react";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
	<Router>
		<Route path="/" exact component={Home} />
		<Route path="/chat" component={Chat} />
	</Router>
);

export default App;
