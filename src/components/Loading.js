import React  from "react";
import styled from "styled-components";
import {  Spin} from "antd";


const Loading = styled.div`
    text-align: center;
    font-size: 30px;
    height: 50vh;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
`;

export default ()=>{
return (
    <Loading>
       <Spin size="large" />
     {/* <p> Hold on, fetching tasks may take some time :)</p> */}
    </Loading>
  );

};
