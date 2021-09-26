import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Layout , Menu } from "antd";
import { useIsAuthenticated} from "../../routes/auth/hooks";
import { Link ,useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONS from "../../routes/auth/actions/types";
import { useCurrentUser } from "../../routes/auth/hooks";
import {
	MenuOutlined, 
	CloudOutlined,
	CheckCircleOutlined,
	SnippetsOutlined,
	UserOutlined,
	UploadOutlined,
} from "@ant-design/icons";

const Header = styled(Layout.Header)`
	position: sticky;
	z-index: 1110;
	top: 0;
	display: flex;
`;

const LinkStyled = styled.div`
	margin-right: 0;
	margin-left: auto;
	a {
		margin: 10px;
	}
`;
const LogoStyled = styled(Link)`
	font-style: italic;
    font-family: serif;
    font-size: large;
	margin-left:40px;
`;
const { SubMenu } = Menu;
const Sider = styled(Layout.Sider)`
	height: 30px;
	position:fixed;
	top: 5px;
	left: 0;
	right: auto;

`;

export default () => {
	const authenticated = useIsAuthenticated();
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useCurrentUser();
	const isDesktop = useMediaQuery({ minWidth: 500 });
	return (
		<Header>
				{authenticated ? 
			<Sider trigger={null} collapsible collapsed={true}>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <SubMenu key="sub1"  title={<MenuOutlined/>}>
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
					{user?.type === "admin"?
					<Menu.Item key="5">
					<Link to="/all-tasks">
					 <SnippetsOutlined />
						 <span className="nav-text">All Tasks</span>
						</Link>
					</Menu.Item>
					 :null 
					 } 
					 {user?.type === "admin"?
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
					 </SubMenu>
				</Menu>
			</Sider>
			:null}
			<LogoStyled to="/" >
				TaskManger
			</LogoStyled>
			{authenticated ? null: (
				isDesktop?
				<LinkStyled>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</LinkStyled>:
					<LinkStyled>
					<Link to="/login">Login</Link>
				</LinkStyled>
			)}
		</Header>
	);
};
