import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Card, Button } from "antd";
import API from '../config/apiBase';
import { notification } from 'antd';
import {  useHistory , useParams  } from "react-router-dom";
import Loading from "./Loading"


const Container = styled.div`
margin:50px auto;
padding: 50px;
@media only screen and (max-width: 600px) {
  padding: 50px 20px;
	}	
`;
const Cardstyled = styled(Card)`
 width:100%;
 min-width:200px;
 text-align:center;
 background:#f3f10f32;
 .ant-card-head{
  background: ${props => props.done==="done" ? "#00be0e":"#f3f10f32"};
 }
`;
const Edits = styled.div`
  display:flex;
  gap:10px;
  justify-content:center;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
	}	
`;
export default () => {
  const history = useHistory();
  const params  = useParams();
  const [error, setError] = useState(false);
  const [isStatus, setstatus] = useState();
  const [appState, setAppState] = useState({
    loading: false,
    tasked: null
  });
  useEffect(() => {
    setAppState({ loading: true });
    API.get(`task/${params.id}`,{
      withCredentials: true
    }).then((res) => {
      const task = res.data;
      setAppState({ loading: false, tasked: task });
      setstatus(task.status)
    }).catch(() =>{
      setError(true);
      setAppState({ loading: false });
    })
  }, [setAppState]);

 const tasked = appState?.tasked? appState?.tasked:{};
 const start_time = new Date(tasked.start_time).toLocaleString();
 const end_time = new Date(tasked.end_time).toLocaleString();
 const created = new Date(tasked.created).toLocaleString();

 if (appState?.loading)return <Loading/>;
  return (
    <Container>
    {error? history.goBack(): 
    <Cardstyled title={tasked.title} done={isStatus} >
    <p><b>Discription:</b> {tasked.details}</p>
    <p><b>Status:</b> {isStatus}</p>
    <p><b>Start Time:</b> {start_time}</p>
    <p><b>End Time:</b> {end_time}</p>
     <p><b>Created on:</b> {created}</p>
     <Edits>
     <Button type="primary" danger
     onClick={()=>API.delete(`/delete/${tasked.id}`,{withCredentials: true}).then((res)=> 
     notification[res.data?.type]({
     top:80,
     message: res.data?.message,
   }),history.goBack())}
  >Remove Task</Button>
      <Button type="primary" 
        onClick={()=>API.patch(`/mark/${tasked.id}`,
        {status: isStatus==="done"? "undone":"done", completed_on: new Date()},
        {withCredentials: true}).then((res)=> 
         notification[res.data?.type]({
         top:80,
         message: res.data?.message,
       }),setstatus(isStatus==="done"? "undone":"done"))}
        >{isStatus==="done"? "Mark as uncopmleted":"Mark as completed"}</Button>
       <Button onClick={()=>history.goBack()}>Go Back</Button>
       </Edits>
  </Cardstyled>
   }
   </Container>
  );
};
