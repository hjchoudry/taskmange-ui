import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import ACTIONS from "../../routes/auth/actions/types";
import { useCurrentUser} from "../../routes/auth/hooks";

import {
	CloudOutlined,
	CheckCircleOutlined,
	SnippetsOutlined,
	UserOutlined,
	UploadOutlined,
	AppstoreOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const Sider = styled(Layout.Sider)`
	overflow: auto;
	height: 100vh;
	position: fixed;
	top: 64px;
	left: 0;
	right: auto;
`;

export default () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useCurrentUser();

	return (
		<Layout>
			<Sider>
				<div className="logo" />
				<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
					<Menu.Item key="1">
						<Link to="/">
						<SnippetsOutlined />
							<span className="nav-text">Tasks to do</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/task-completed">
						<CheckCircleOutlined />
							<span className="nav-text">Tasks Completed</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="3">
					   <Link to="/add-task">
							<UploadOutlined />
							<span className="nav-text">Add New Tasks</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="4">
					<Link to="/account">
							<CloudOutlined />
							<span className="nav-text">My Account</span>
						</Link>
					</Menu.Item>
					{user.type=== "admin"?
                       <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Admin Account">
					<Menu.Item key="6">
					<Link to="/all-tasks">
					 <SnippetsOutlined />
						 <span className="nav-text">All Tasks</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="7">
					<Link to="/all-users">
							<CloudOutlined />
							<span className="nav-text">All Users</span>
						</Link>
					</Menu.Item>
					 </SubMenu>
				    :null
					}
					<Menu.Item key="5">
					<UserOutlined />
						<Link
							onClick={() =>
								dispatch({
									type: ACTIONS.REQUEST_SIGNOUT,
									payload: { history }
								})
							}
						>
							<span className="nav-text"> Logout </span>
						</Link>
					</Menu.Item>
				</Menu>
			</Sider>
		</Layout>
	);
};
