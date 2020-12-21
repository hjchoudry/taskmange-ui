import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import TaskCompleted from '../../components/TaskCompleted';
import API from '../../config/apiBase';

const Home = styled.div`
  width: 100%;
  h2{
    font-size:30px;
    margin: 10px 30px;
    text-align: center;
  }
  div{
    text-align:center;
  }
`;

export default () => {
  const [error, setError] = useState();
  const [appState, setAppState] = useState({
    loading: false,
    tasks: null,
  });
  useEffect(() => {
    setAppState({ loading: true });
    API.get(`tasks-completed`,{
      withCredentials: true
    }).then((tasks) => {
      const alltasks = tasks.data;
      setAppState({ loading: false, tasks: alltasks });
    }).catch(function (error) {
      setError(error?.response?.data?.alert)
  })
  }, [setAppState]);

  return (
    <Home>
       {error? <div>
         <h3>{error.message}</h3>
         <p>{error.description}</p>
        </div>:
        <>
        <h2>You have completed  {appState?.tasks?.total}  Tasks!</h2>
        <hr/>
        <TaskCompleted isLoading={appState.loading}  tasks={appState?.tasks?.tasksCompleted} /> 
        </>
       }
    </Home>
  );
};
