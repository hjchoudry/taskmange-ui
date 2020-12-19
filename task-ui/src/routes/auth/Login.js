import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Checkbox  } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ACTIONS from "./actions/types";

const FormStyled = styled.div`
  width: 25%;
  min-width: 200px;
  margin: auto;
  h5{
    color:red;
  }
`;

const Remeber = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 12px;
`;
const ButtonStyled = styled(Button)`
  width: 100%;
`;

const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [serverErrors, setServerErrors] = useState();
  return (
    <FormStyled>
      <h3>Fill form to Login</h3>
      {serverErrors?
      <h5>{serverErrors.loginError}</h5>
      :""
     }
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        onFinish={values => {
          dispatch({
            type: ACTIONS.REQUEST_SIGNIN,
            payload: { ...values, history, setServerErrors }
          });
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!"
            }
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>

        <Remeber>
          <div>
            <Checkbox /> Remember Me
          </div>
          <a href="/"> Forgot Password?</a>
        </Remeber>
        <Form.Item>
          <ButtonStyled type="primary" htmlType="submit">
            Log In
          </ButtonStyled>
        </Form.Item>
      </Form>
      <Form.Item>
        <p>
          Don't have account? <a href="/Register">Register here</a>
        </p>
      </Form.Item>
    </FormStyled>
  );
};
