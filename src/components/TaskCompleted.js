import React  from "react";
import styled from "styled-components";
import { BackTop } from "antd";
import { UpCircleTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import TaskCompletedCard from "./TaskCompletedCard";
import Loading from "./Loading";

const Container = styled.div`
  display:flex;
  gap:30px;
  flex-wrap:wrap;
  justify-content:center;
  button {
    margin: 5px;
    color: #fff;
    border-radius: 4px;
    background-color: #3f51b5;
  }
`;

const Notasks = styled.p`
  text-align:center;
`;

export default (props) => {
  const { tasks } = props;
  const { isLoading } = props;
 
  if(isLoading)return <Loading/>;

  if (!tasks|| tasks?.length === 0) 
  return <Notasks>No tasks completed yet, <Link to="/">Complete task here</Link></Notasks>;
  
  return (
    <Container>
    {tasks?.slice().sort(function(a,b){return new Date(b.completed_on) - new Date(a.completed_on);})?.map((task,index) => 
     <TaskCompletedCard {...task} key={index}/>
    )}
  <BackTop>
      <UpCircleTwoTone />
    </BackTop>
</Container>
  );
};
