import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Task from './tasks/Task';
import TaskLoading from './tasks/TaskLoading';
import API from '../../config/apiBase';

const Home = styled.div`
  width: 100%;
  h2{
    margin: 10px 30px;
    text-align: center;
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
    API.get(`/admin/all-tasks`,{
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
        <h2>All Tasks</h2>
      <ListLoading isLoading={appState.loading} tasks={appState.tasks} />
        </>
       }
    </Home>
  );
};
