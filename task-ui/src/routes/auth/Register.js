import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ACTIONS from "./actions/types";
import { Form, Input, Checkbox, Button } from "antd";

const FormStyled = styled.div`
  width: 25%;
  min-width: 200px;
  margin: auto;
`;

const Terms = styled.div`
  margin: 10px 0;
  font-size: 10px;
`;
const Register = styled(Button)`
  width: 100%;
`;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 24
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 24
    }
  }
};

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [serverErrors, setServerErrors] = useState();
  console.log(serverErrors);
  return (
    <FormStyled>
      <h3>Fill form to create new Account</h3>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={values => {
          dispatch({
            type: ACTIONS.REQUEST_SIGNUP,
            payload: { ...values, history, setServerErrors }
          });
        }}
        scrollToFirstError
        labelAlign="left"
      >
        <Form.Item
          name="name"
          label={<span>Name&nbsp;</span>}
          rules={[
            {
              required: true,
              message: "Please input your Name!",
              whitespace: true
            }
          ]}
        >
          <Input placeholder="Name" minlength="3" maxlength="30" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          validateStatus={serverErrors?.username?.length ? "error" : undefined}
          help={
            serverErrors?.username?.length
              ? serverErrors?.username
              : undefined
          }
          rules={[
            {
              required: true,
              message: "Please input your Username",
              whitespace: true
            }
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          validateStatus={serverErrors?.password?.length ? "error" : undefined}
          help={
            serverErrors?.password?.length
              ? serverErrors?.password
              : undefined
          }
          hasFeedback
        >
          <Input.Password placeholder="********"  />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords  do not match!");
              }
            })
          ]}
        >
          <Input.Password placeholder="********"  />
        </Form.Item>

        <Terms>
          <Checkbox>
            I have read the <a href="">Terms and conditions</a>
          </Checkbox>
        </Terms>
        <Form.Item>
          <Register type="primary" htmlType="submit">
            Register
          </Register>
        </Form.Item>
      </Form>
      <p>
        Already have account? <a href="/Login">Login here</a>
      </p>
    </FormStyled>
  );
};
