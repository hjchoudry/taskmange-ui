import React from "react";
import styled from "styled-components";
import { Form, Input, Button,DatePicker} from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONS from "./actions/types";

const FormStyled = styled.div`
    width: 30%;
    min-width: 200px;
    margin: 50px auto;
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
                        remember: true,
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
                     <TextArea placeholder="Enter here what to do!" rows={5}/>
                    </Form.Item>
                    <Form.Item
                        label="Task Start Time:"
                        name="start_time"
                        rules={[
                            {
                                required: true,
                                message: "Please input time."
                            },
                            ({ getFieldValue }) => ({
                                validator() {
                                     if ( getFieldValue("start_time") > new Date()) {
                                    return Promise.resolve();
                                  }
                                else return Promise.reject("Should be greater than current time");
                                }
                              })
                        ]}
                    >
                        <DatePicker
                          format="DD-MM-YYYY HH:mm"  
                          showTime={{ format: 'HH:mm' }}/>
                    </Form.Item>
                
                    <Form.Item
                        label="Task End Time:"
                        name="end_time"
                        rules={[
                            {
                                required: true,
                                message: "Please input date."
                            },
                            ({ getFieldValue }) => ({
                                validator() {
                                     if ( getFieldValue("start_time") < getFieldValue("end_time")) {
                                    return Promise.resolve();
                                  }
                                else return Promise.reject("Should be greater than starting time");
                                }
                              })
                        ]}
                    >
                      <DatePicker
                          format="DD-MM-YYYY HH:mm"  
                          showTime={{ format: 'HH:mm' }}/>
                    </Form.Item>
                    <Form.Item  >
                        <ButtonStyled type="primary" htmlType="submit">
                            Add Task
                        </ButtonStyled>
                    </Form.Item>
                </Form>
        </FormStyled>
    );
}; 