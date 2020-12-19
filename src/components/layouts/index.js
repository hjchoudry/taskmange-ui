import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { useIsAuthenticated } from "../../routes/auth/hooks";

const Contanier = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
`;
const Main = styled.div`
	width: 95%;
	margin: auto;
	padding-left: 180px;
	display: flex;
	min-height: 80vh;
	align-items: center;
	background-color: #fff;
`;
const Content = styled.div`
	width: 95%;
	margin: auto;
	display: flex;
	min-height: 80vh;
	align-items: center;
	background-color: #fff;
`;

export default ({ children }) => {
	const authenticated = useIsAuthenticated();
	return (
		<Contanier>
			<Header />
			{authenticated ? (
				<>
					<SideBar />
					<Main>{children}</Main>
				</>
			) : (
				<Content>{children}</Content>
			)}
			<Footer />
		</Contanier>
	);
};
