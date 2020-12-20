import React,{useState} from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
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
	MenuUnfoldOutlined
} from "@ant-design/icons";

const Sider = styled(Layout.Sider)`
	height: 100vh;
	position:fixed;
	top: 64px;
	left: 0;
	right: auto;

`;
const ButtonStyled = styled.div`
       color:#fff;
		display:flex;
		justify-content:flex-end;
`; 

export default () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useCurrentUser();
	const [collapsed, setCollapsed ] = useState(false)
	const isDesktop = useMediaQuery({ minWidth: 1000 });
	return (
		<>
			{isDesktop?
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<ButtonStyled>
				<MenuUnfoldOutlined  onClick={()=>setCollapsed(!collapsed)}/>
				</ButtonStyled>
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
					{user.type === "admin"?
					<Menu.Item key="5">
					<Link to="/all-tasks">
					 <SnippetsOutlined />
						 <span className="nav-text">All Tasks</span>
						</Link>
					</Menu.Item>
					 :null 
					 } 
					 {user.type === "admin"?
					 <Menu.Item key="6">
					<Link to="/all-users">
							<CloudOutlined />
							<span className="nav-text">All Users</span>
						</Link>
					</Menu.Item> 
					 :null 
					 } 
					<Menu.Item key="7">
					<UserOutlined />
					<span onClick={() =>
				 				dispatch({
									type: ACTIONS.REQUEST_SIGNOUT,
									payload: { history }
								})
							}
							 className="nav-text"> Logout </span>
					</Menu.Item>
				</Menu>
			</Sider>
			:null}
			</>
	);
};
