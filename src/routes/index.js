import React from "react";
import {  Switch, Route } from "react-router-dom";
import Layout from "../components/layouts";
import SingleTask from "../components/SingleTask";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import TaskCompleted from "./Home/TaskCompleted";
import Account from "./auth/account";
import AddSong from "./auth/add-task";
import AllTasks from "./Admin/Alltasks";
import AllUsers from "./Admin/Allusers";
import Video from "../components/video/Video";

import { useIsAuthenticated } from "./auth/hooks";

export default () => {
	const authenticated = useIsAuthenticated();
	return (
		<>
			{authenticated ?
			<Switch>
			    <Route path="/login" component={Login} />
				<Route path="/video" component={Video} />
				<Route path="/register" component={Register} />
				<Route path="/account" component={Account} />
				<Route path="/add-task" component={AddSong} />
				<Route path="/task-completed" component={TaskCompleted} />
			    <Route path="/all-tasks" component={AllTasks} />
				<Route path="/all-users" component={AllUsers} />
				<Route path="/task/:id" component={SingleTask} />
				<Route path="/" component={Home} />
			</Switch>:
          	<Switch>
			  <Route path="/login" component={Login} />
			  <Route path="/register" component={Register} />
			  <Route path="/" component={Home} />
		  </Switch>
}
		</>
	);
};
