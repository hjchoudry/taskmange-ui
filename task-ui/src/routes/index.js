import React from "react";
import {  Switch, Route } from "react-router-dom";
import { useCurrentUser} from "./auth/hooks";
import Layout from "../components/layouts";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import TaskCompleted from "./Home/TaskCompleted";
import Account from "./auth/account";
import AddSong from "./auth/add-task";
import AllTasks from "./Admin/Alltasks";
import AllUsers from "./Admin/Allusers";

export default () => {
	const user = useCurrentUser();
	return (
		<Layout>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/account" component={Account} />
				<Route path="/add-task" component={AddSong} />
				<Route path="/task-completed" component={TaskCompleted} />
			    <Route path="/all-tasks" component={AllTasks} />
				<Route path="/all-users" component={AllUsers} />
				<Route path="/" component={Home} />
			</Switch>
		</Layout>
	);
};
