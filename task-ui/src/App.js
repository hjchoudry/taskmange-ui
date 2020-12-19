import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Route from "./routes";
import "antd/dist/antd.css";

function App() {
	return (
		<BrowserRouter>
			<Route />
		</BrowserRouter>
	);
}

export default App;
