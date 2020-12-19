import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Task from '../../components/Task';
import TaskLoading from '../../components/TaskLoading';
import API from '../../config/apiBase';

const Home = styled.div`
  width: 100%;
  h2{
    margin: 10px 30px;
    text-align:center;
  }
  div{
    text-align:center;
  }

`;

export default () => {
  const ListLoading = TaskLoading(Task);
  const [error, setError] = useState();
  const [appState, setAppState] = useState({
    loading: false,
    tasks: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    API.get(`tasks-to-do`,{
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
        <h2>Tasks to Do</h2>
      <ListLoading isLoading={appState.loading} tasks={appState.tasks} />
        </>
       }
    </Home>
  );
};
