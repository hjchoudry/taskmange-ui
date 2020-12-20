import React from "react";
import styled from "styled-components";
import { BackTop , Card,Button} from "antd";
import { UpCircleTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import API from '../config/apiBase';
import { notification } from 'antd';
import { useHistory } from "react-router-dom";

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
const Cardstyled = styled(Card)`
 width:30%;
 min-width:200px;

`;
const Edits = styled.div`
  display:flex;
  flex-direction: column;
`;

const Task = (props) => {
  const history = useHistory();
  const { tasks } = props;
  if (!tasks || tasks.length === 0) return <Notasks>No tasks yet, <Link to="/add-task">create task here</Link></Notasks>;
  return (
    <Container>
          {tasks.sort((b, a) => a.id - b.id).map((task) => {
            return (
              <Cardstyled title={task.title} >
             <p><b>Discription:</b> {task.details}</p>
             <p><b>Time:</b> {new Date(task.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
             <p><b>Date:</b> {new Date(task.date).getUTCDate()}/{new Date(task.date).getMonth()}/{new Date(task.date).getFullYear()}</p>
              {task.completed === "done"?
              <Edits>
                 <Button onClick={()=>history.push(`/task/${task.id}`)}>View details</Button>
              <Button onClick={()=>API.delete(`/delete/${task.id}`).then((res)=> 
              notification[res.data.type]({
              top:80,
              message: res.data.message,
            }))}
           >Remove Task</Button>
              </Edits>
               :
              <Edits>
               <Button onClick={()=>API.patch(`/mark/${task.id}`).then((res)=> 
                  notification[res.data.type]({
                  top:80,
                  message: res.data.message,
                }))}
             >Mark as Done</Button>
                 <Button onClick={()=>history.push(`/task/${task.id}`)}>View details</Button>
            </Edits>
              }
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
