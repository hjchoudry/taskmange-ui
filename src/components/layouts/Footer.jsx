import React from "react";
import styled from "styled-components";

const FooterStyled = styled.div`
	border-top: 1px solid #ddd;
	height: 30px;
	line-height: 30px;
	align-items: center;
	left: 0;
	bottom: 0;
	right: 0;
	p {
		text-align: center;
		margin-top: 10px;
	}
`;

export default () => {
	return (
		<FooterStyled>
			<p>...Copyright © 2020 tasksMangement.com All Rights Reserved.</p>
		</FooterStyled>
	);
};
