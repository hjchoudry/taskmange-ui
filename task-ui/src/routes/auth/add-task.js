import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, TimePicker,DatePicker} from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONS from "./actions/types";
import moment from 'moment';

const format = 'HH:mm';
const FormStyled = styled.div`
    width: 30%;
    min-width: 200px;
    margin: auto;
`;
const { TextArea } = Input;
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
    return (
        <FormStyled>
                <h2>Add New Task </h2>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={values => {
                        dispatch({
                            type: ACTIONS.REQUEST_ADDTASK,
                            payload: { ...values, history }
                        });
                    }}
                >
                    <Form.Item
                        label="Task Title:"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please input task title."
                            }
                        ]}
                    >
                        <Input placeholder="Task title" />
                    </Form.Item>
                    <Form.Item
                        name="details"
                        label="Details"
                        rules={[
                            {
                                required: true,
                                message: "Please enter task detail."
                            }
                        ]}
                    >
                     <TextArea placeholder="Task title" />
                    </Form.Item>
                    <Form.Item
                        label="Task Time:"
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: "Please input time."
                            }
                        ]}
                    >
                       <TimePicker defaultValue={moment('12:08', format)} format={format} />
                    </Form.Item>
                    <Form.Item
                        label="Task Date:"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: "Please input date."
                            }
                        ]}
                    >
                      <DatePicker/>
                    </Form.Item>
                    <Form.Item>
                        <ButtonStyled type="primary" htmlType="submit">
                            Add Task
                        </ButtonStyled>
                    </Form.Item>
                </Form>
        </FormStyled>
    );
}; 