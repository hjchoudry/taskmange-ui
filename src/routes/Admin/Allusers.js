import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Users from './tasks/Users';
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
  const ListLoading = TaskLoading(Users);
  const [error, setError] = useState();
  const [userState, setUsers] = useState({
    loading: false,
    users: null,
  });
  useEffect(() => {
    setUsers({ loading: true });
    API.get(`/admin/all-users`,{
      withCredentials: true
    }).then((getusers) => {
      const allusers = getusers.data;
      setUsers({ loading: false, users: allusers });
    }).catch(function (error) {
      setError(error?.response?.data?.alert)
  })
  }, [setUsers]);
  return (
    <Home>
       {error? <div>
         <h3>{error.message}</h3>
         <p>{error.description}</p>
        </div>:
        <>
        <h2>All Users are {userState?.users?.total}</h2>
      <ListLoading isLoading={userState.loading} users={userState?.users?.users} key />
        </>
       }
    </Home>
  );
};
