import React,{ useState }from "react";
import styled from "styled-components";
import { BackTop} from "antd";
import { UpCircleTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import API from '../../../config/apiBase';
import { notification } from 'antd';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - (70px + 44px));
  button {
    margin: 5px;
    color: #fff;
    border-radius: 4px;
    background-color: #3f51b5;
  }
`;
const TodoBox = styled.div`
    border: 1px solid #000;
    min-height: 80px;
    padding: 10px;
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 10px 30px;
    justify-content: space-between;
    background:#f2f2f2;
`;
const Todotask = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;
const Notasks = styled.p`
  text-align:center;
`;
const Edits = styled.div`
  display:flex;
  flex-direction:column;
`;

const AllUsers = (props) => {
  const { users } = props;
  // console.log(props)
  if (!users || users.length === 0) return <Notasks>No user yet, </Notasks>;
  return (
    <Container>
      {users.map((user) => {
        return (
         <TodoBox  >
          <Todotask>
          <h3>Name:<span> {user.name}</span></h3> 
          <p><b>Username:</b> {user.username}</p>
          <p><b>type:</b> {user.type}</p>
          </Todotask>
          <Edits>
          <a onClick={()=>API.delete(`/admin/delete-user/${user.id}`).then((res)=> 
            notification[res.data.type]({
            top:80,
            message: res.data.message,
           }))
          }
           >Remove</a>
          </Edits>
          </TodoBox>
          )
      })}
        <BackTop>
            <UpCircleTwoTone />
          </BackTop>
    </Container>

  );
};
export default AllUsers;
