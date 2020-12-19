import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { useIsAuthenticated} from "../../routes/auth/hooks";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

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
	img {
		width: 100px;
		height: 40px;
	}
`;

export default () => {
	const authenticated = useIsAuthenticated();
	return (
		<Header>
			<LogoStyled to="/" className="gx-site-logo">
				<img alt="logo here" src={Logo} />
			</LogoStyled>
			{authenticated ? null : (
				<LinkStyled>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</LinkStyled>
			)}
		</Header>
	);
};
