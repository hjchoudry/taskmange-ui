import React from "react";
import styled from "styled-components";
import { BackTop,Card, Button} from "antd";
import { UpCircleTwoTone } from "@ant-design/icons";
import API from '../../../config/apiBase';
import { notification } from 'antd';

const Container = styled.div`
  width: 100%;
  display:flex;
  gap:20px;
  flex-wrap:wrap;
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
const Edits = styled.div`
  display:flex;
  flex-direction: column;
`;
const Cardstyled = styled(Card)`
 width:30%;
 min-width:200px;
 background:#f4f20070;
 .ant-card-head{
  background: ${props => props.done==="done" ? "#00be0e":"#f4f20070"};
 }
`;
const Task = (props) => {
  const { tasks } = props;
  if (!tasks || tasks.length === 0) return <Notasks>No tasks yet</Notasks>;
  return (
    <Container>
      {tasks.sort((b, a) => a.id - b.id).map((task) => {
        const start_time = new Date(task.start_time).toLocaleString();
        const end_time = new Date(task.end_time).toLocaleString();
        const created = new Date(task.created).toLocaleString();
        const completed_on = new Date(task.completed_on).toLocaleString();
        return (
          <Cardstyled title={task.title} done={task.status} key={task.id}>
          <p><b>Discription:</b> {task.details}</p>
          <p><b>Status:</b> {task.status}</p>
          <p><b>Start time:</b>{start_time}</p>
          <p><b>End time:</b>{end_time}</p>
          <p><b>Created by:</b> {task.user_name}</p>
          <p><b>Created on:</b> {created}</p>
          <p><b>Completed on:</b>{completed_on}</p>
          <Edits>
           <Button onClick={()=>API.patch(`/admin/mark/${task.id}`,
           {status: "done",completed_on: new Date()},
           ).then((res)=> 
              notification[res.data.type]({
              top:80,
              message: res.data.message,
            }))}
           >Mark as Done</Button>
            <Button onClick={()=>API.delete(`/admin/delete-task/${task.id}`).then((res)=> 
              notification[res.data.type]({
              top:80,
              message: res.data.message,
            }))}
           >Remove Task</Button>
           </Edits>
       </Cardstyled>
          )
      })}
        <BackTop>
            <UpCircleTwoTone />
          </BackTop>
    </Container>

  );
};
export default Task;
