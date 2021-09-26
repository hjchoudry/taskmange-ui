import React  from "react";
import styled from "styled-components";
import { BackTop } from "antd";
import { UpCircleTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import TaskTodoCard from "./TaskTodoCard";
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
  return <Notasks>No tasks completed yet, <Link to="/add-task">Create task here</Link></Notasks>;
  
  return (
    <Container>
      <div ></div>
    {tasks?.slice().sort(function(b,a){return new Date(b.start_time) - new Date(a.start_time);})?.map((task,index) => 
        <TaskTodoCard {...task} key={index}/>
      )}
  <BackTop>
      <UpCircleTwoTone />
    </BackTop>
</Container>
  );
};