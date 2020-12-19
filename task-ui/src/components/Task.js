import React from "react";
import styled from "styled-components";
import { BackTop} from "antd";
import { UpCircleTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import API from '../config/apiBase';
import { notification } from 'antd';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - (70px + 44px));
  button {
    margin: 5px;
    color: #fff;
    border-radius: 4px;
    background-color: #3f51b5;
  }
`;
const TodoBox = styled.div`
    border: 1px solid #000;
    min-height: 80px;
    padding: 10px;
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 10px 30px;
    justify-content: space-between;
    background:#f2f2f2;
`;
const Todotask = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;
const Notasks = styled.p`
  text-align:center;
`;

const Task = (props) => {
  const { tasks } = props;
  if (!tasks || tasks.length === 0) return <Notasks>No tasks yet, <Link href="/add-task">create task here</Link></Notasks>;
  return (
    <Container>
      {tasks.map((task) => {
        return (
         <TodoBox  >
          <Todotask>
          <h3>Title:<span> {task.title}</span></h3> 
          <p><b>Discription:</b> {task.details}</p>
          <h5><b>Time:</b> {new Date(task.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h5>
          <h5><b>Date:</b> {new Date(task.date).getUTCDate()}/{new Date(task.date).getMonth()}/{new Date(task.date).getFullYear()}</h5>
          <p>Created on {new Date(task.time).getUTCDate()}/{new Date(task.time).getMonth()+1} at 
          {new Date(task.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </p>
          </Todotask>
          {task.completed === "done"?
          <Link onClick={()=>API.delete(`delete/${task.id}`).then((res)=> 
            notification[res.data.type]({
            top:80,
            message: res.data.message,
           }))
          }
           >Remove</Link>:
           <Link onClick={()=>
            API.patch(`mark/${task.id}`).then((res)=> 
             notification[res.data.type]({
            top:80,
            message: res.data.message,
           }))
          }
           >Mark as Done</Link>
          }
          </TodoBox>
          )
      })}
        <BackTop>
            <UpCircleTwoTone />
          </BackTop>
    </Container>

  );
};
export default Task;
