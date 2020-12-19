import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONS from "./actions/types";
import  { useCurrentUser} from "./hooks";
import { FormOutlined,ExclamationCircleOutlined } from "@ant-design/icons";

const Container = styled.div`
	width: 40%;
	min-width: 200px;
	margin: 30px auto;
`;
const EditContainer = styled.div`
  display:flex;
  gap:20px;
  margin-bottom:20px;
`;
const EditName = styled(Button)`
  width:50%;
`;
const Name = styled.div`  
    margin:10px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	const user = useCurrentUser();
	const [showName, setShowName] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [serverErrors, setServerErrors] = useState("");
	
	function confirm() {
		dispatch({
			type: ACTIONS.REQUEST_DELETEACCOUNT,
			payload: { history }
			})
	  }
	  
	return (
		<Container>
			<h2>Account info:</h2>
			<h3>Username: {user?.username}</h3>
			<Name>
			<h3>Name: {user?.name}</h3>
			<FormOutlined onClick={()=>setShowName(!showName)} />
			</Name>
			{showName?
			<Form
				{...layout}
				name="basic"
				initialValues={{
					remember: true,
					name:user?.name,
				}}
				onFinish={values => {
					dispatch({
						type: ACTIONS.REQUEST_EDITUSER,
						payload: { ...values, setServerErrors }
					});
					setShowName(!showName)
				}}
			>
				<Form.Item
					label="Edit Name:"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input new name."
						}
					]}
				>
					<Input/>
				</Form.Item>
					<EditContainer>
					<EditName type="button" onClick={()=>setShowName(!showName)}>
						Cancel
					</EditName>
					<EditName type="primary" htmlType="submit">
						Save
					</EditName>
				    </EditContainer>
			</Form>
                :null}
			{!showPassword?	
				<Name>
				<h3>Change Password</h3>
				<FormOutlined onClick={()=>setShowPassword(!showPassword)} />
				</Name>
				:null}
			
			{showPassword?
			<Form
				{...layout}
				name="basic"
				initialValues={{
					remember: true
				}}
				onFinish={values => {
					dispatch({
						type: ACTIONS.REQUEST_CHANGEPASSWORD,
						payload: { ...values, setServerErrors, setShowPassword }
					});
					setServerErrors()
				}}
			>
				<Form.Item
					name="oldPassword"
					label="Current Password"
					validateStatus={serverErrors?.oldPassword?.length ? "error" : undefined}
					help={
					  serverErrors?.oldPassword?.length
						? serverErrors?.oldPassword
						: undefined
					}
					rules={[
						{
							required: true,
							message: "Please input your password!"
						}
					]}
					hasFeedback
				>
					<Input.Password placeholder="********"  />
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
					hasFeedback
				>
					<Input.Password placeholder="********" />
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
					<Input.Password placeholder="********"/>
				</Form.Item>
				  <EditContainer>
					<EditName type="button" onClick={()=>setShowPassword(!showPassword)}>
						Cancel
					</EditName>
					<EditName type="primary" htmlType="submit">
						Save
					</EditName>
				    </EditContainer>
			</Form>
			:null}
			
			 <Popconfirm
				title="Are you sure to delete Account?"
				onConfirm={confirm}
				// onCancel={cancel}
				okText="Yes"
				cancelText="No"
			>
			<Button type="primary" danger>
              Delete Account
             </Button>
			</Popconfirm>
		</Container>
	);
};
