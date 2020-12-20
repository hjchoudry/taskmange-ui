import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Card,Button } from "antd";
import API from '../config/apiBase';
import { notification } from 'antd';
import { Link, useHistory , useParams  } from "react-router-dom";
import {
  LoadingOutlined,
  InfoCircleOutlined 
} from '@ant-design/icons';

const Cardstyled = styled(Card)`
 width:80%;
 min-width:200px;
 text-align:center;

`;
const Edits = styled.div`
  display:flex;
  flex-direction: column;
`;
export default () => {
  const params = useParams();
  const history = useHistory();
  const [error, setError] = useState(false);
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
    }).catch(() =>{
      setError(true);
      setAppState({ loading: false });
    })

  }, [setAppState]);
 const tasked = appState?.tasked? appState?.tasked:{};

  if (appState?.loading){ 
  return (
    <div style={{ textAlign: 'center', fontSize: '30px'  }}>
       <LoadingOutlined/>
     <p> Hold on, fetching tasks may take some time :)</p>
    </div>
  );
  }
  return (
    <>
    {error? 
    <div style={{ textAlign: 'center', fontSize: '30px'  }}>
       <InfoCircleOutlined />
     <p>Unable to fetch task</p>
     <p onClick={history.goBack()}>Go Back</p>
    </div>: 
    <Cardstyled title={tasked.title} >
    <p><b>Discription:</b> {tasked.details}</p>
    <p><b>Status:</b> {tasked.completed}</p>
    <p><b>Time:</b> {new Date(tasked.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
    <p><b>Date:</b> {new Date(tasked.date).getUTCDate()}/{new Date(tasked.date).getMonth()}/{new Date(tasked.date).getFullYear()}</p>
     <p><b>type:</b> {tasked.id}</p>
     <p><b>Created by:</b> {tasked.user_name}</p>
     <p><b>Created on:</b> {tasked.created}</p>
     <Button onClick={()=>API.delete(`/delete/${tasked.id}`).then((res)=> 
     notification[res.data?.type]({
     top:80,
     message: res.data?.message,
   }))}
  >Remove Task</Button>
      <Button onClick={()=>API.patch(`/mark/${tasked.id}`).then((res)=> 
         notification[res.data?.type]({
         top:80,
         message: res.data?.message,
       }))}
      >Mark as Done</Button>
       <Button onClick={()=>history.goBack()}>View details</Button>
  </Cardstyled>
   }
   </>
  );
};
