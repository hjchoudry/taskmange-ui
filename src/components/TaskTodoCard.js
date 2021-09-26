import React, {useState} from "react";
import styled from "styled-components";
import { Card,Button } from "antd";
import API from '../config/apiBase';
import { notification } from 'antd';
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined, CheckCircleTwoTone,ClockCircleOutlined } from '@ant-design/icons';

const Main = styled.div`
 width:30%;
 min-width:200px;
 margin-bottom:10px;
 height:auto;
 display:flex;
 flex-direction:column;
`;

const Cardstyled = styled(Card)`
 text-align:center;
 height:100%;
 background:#f4f20070;
 .ant-card-head{
  background: ${props => props.done==="done" ? 
  "#00be0e": "#f4f20070"};
 }

`;
const Headings = styled.h3`
  color:${props => `${props.colored}`};
  span{
    font-size:30px;
  }
`;
const Edits = styled.div`
  display:flex;
  flex-direction: column;
  padding:10px 20px;
  min-height:100px;
  background:#f4f20070;
`;
const TodoCard = (task) => {
  const [isStatus, setstatus] = useState();
  const history = useHistory();
  const start_time = new Date(task.start_time);
  const end_time = new Date(task.end_time);
  const details = (task.details).slice(0,100);
  const [currentTime ,setCurrentTime] = useState(new Date());
  return (
    <Main onMouseMove={()=> setCurrentTime(new Date())}>
      <Cardstyled title={task.title} key={task.id} done={isStatus} >
      {isStatus!=="done"? 
       end_time < currentTime?
      <Headings colored = "red">
         <span><ExclamationCircleOutlined /></span><br/>
        <b>You missed this task ended on</b>
        <br/>{(end_time).toLocaleString()}
        </Headings>:
         start_time < currentTime ? 
        <Headings colored = "green">
          <span><CheckCircleTwoTone twoToneColor="#52c41a"/></span><br/>
         <b>IN PROGRESS TILL</b><br/>
            {(end_time).toLocaleString()}
         </Headings>
         :<Headings colored = "blue">
           <span> <ClockCircleOutlined /></span><br/>
           <b>Upcomming starting from</b><br/>
            {(start_time).toLocaleString()}
         </Headings>
         :<Headings colored = "green">
         <span><CheckCircleTwoTone twoToneColor="#52c41a"/></span><br/>
          <b>You have completed task on</b><br/>
           {(currentTime).toLocaleString()}
        </Headings>
      }
      <p><b>Discription:</b>{details}...</p>
     </Cardstyled>
     <Edits>
        <Button type="primary" 
        onClick={()=>API.patch(`/mark/${task.id}`,
        {status: isStatus==="done"? "undone":"done",completed_on: new Date()},
        {withCredentials: true}).then((res)=> 
         notification[res.data?.type]({
         top:80,
         message: res.data?.message,
       }),setstatus(isStatus==="done"? "undone":"done"))}
        >{isStatus==="done"? "Mark as uncopmleted":"Mark as completed"}</Button>
        <Button onClick={()=>history.push(`/task/${task.id}`)}>View details</Button>
      </Edits>
     </Main>
  );
};

export default TodoCard;
