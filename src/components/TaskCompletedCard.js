import React ,{useState}  from "react";
import styled from "styled-components";
import {  Card,Button } from "antd";
import API from '../config/apiBase';
import { notification } from 'antd';
import { useHistory } from "react-router-dom";

const Main = styled.div`
 width:30%;
 min-width:200px;
 margin-bottom:10px;
 height:auto;
 display:flex;
 flex-direction:column;
`;
const StyledCard = styled(Card)`
 height:100%;
 background:#84d58abf;
 .ant-card-head{
  background:${props => props.removed ? "red":"#71f687"};
 }
`;
const Edits = styled.div`
  display:flex;
  flex-direction: column;
  padding:10px 20px;
  min-height:100px;
  background:#84d58abf;
`;

export default (task) => {
  const [isRemoved, setremoved] = useState(false);
  const history = useHistory();
  const details = (task.details).slice(0,100);
 const completed_on = new Date(task.completed_on).toLocaleString();
 return (
   <Main>
      <StyledCard title={task.title} key={task.id} removed={isRemoved} >
       <p><b>Discription:</b> {details}...</p>
       <p><b>Completed on:</b>{completed_on}</p>
     </StyledCard>
     <Edits>
     <Button onClick={()=>history.push(`/task/${task.id}`)}>View details</Button>
    <Button type="primary" danger disabled={isRemoved? true:false }
    onClick={()=>API.delete(`/delete/${task.id}`,{withCredentials: true})
    .then((res)=> 
       notification[res.data.type]({
       top:80,
       message: res.data.message,
     }),setremoved(true))}
     >Remove Task</Button>
   </Edits>
   </Main>
    )
};


