import React from "react";
import styled from "styled-components";
import { BackTop , Card, Button} from "antd";
import { UpCircleTwoTone } from "@ant-design/icons";
import API from '../../../config/apiBase';
import { notification } from 'antd';

const Container = styled.div`
  width: 100%;
  display:flex;
  gap:30px;
  flex-wrap:wrap;
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
 background:#f9f4f4;
 min-width:200px;
 .ant-card-head{
  background: ${props => props.admin==="admin" ? "#00be0e":"#f3f10f20"};
 }
`;
const AllUsers = (props) => {
  const { users } = props;
  if (!users || users.length === 0) return <Notasks>No user yet, </Notasks>;
  return (
    <Container>
      {users.map((user) => {
        return (
           <Cardstyled title={user.name} admin={user.type} key={user.id}>
            <p><b>Username:</b> {user.username}</p>
            <p><b>type:</b> {user.type}</p>
             <Button type="primary" danger onClick={()=>API.delete(`/admin/delete-user/${user.id}`).then((res)=> 
            notification[res.data.type]({
            top:80,
            message: res.data.message,
           }))}
             >Remove User</Button>
         </Cardstyled>
          )
      })}
        <BackTop>
            <UpCircleTwoTone />
          </BackTop>
    </Container>

  );
};
export default AllUsers;
