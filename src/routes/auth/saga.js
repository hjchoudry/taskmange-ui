import { put, call, takeLeading } from "redux-saga/effects";
import ACTIONS from "./actions/types";
import {
  signIn ,
  signUp,
  signOut, 
  editUser, 
  addTasks, 
  changePassword,
  deleteAccount
} from "./api";

import { notification } from 'antd';

function* signinHandler(action) {
  const { username, password, history, setServerErrors } = action.payload;
  try {
    const res = yield call(signIn, {
      username,
      password
    });
    switch (res.status) {
      case 200:
        yield put({
          type: ACTIONS.SIGNIN_SUCCESS,
          payload: res.data
        });
        history.push("/");
        notification[res.data.alert.type]({
          top:80,
          message: res.data.alert.message,
        })
        break;
      case 422:
        setServerErrors(res.data);
        break;
      default:
        break;
    }
  } catch (error) {
  } finally {
  }
}

function* signInListener() {
  yield takeLeading(ACTIONS.REQUEST_SIGNIN, signinHandler);
}

function* signOutHandler(action) {
  const { history } = action.payload;
  try {
    const res = yield call(signOut);
    if (res.status === 200) {
      yield put({
        type: ACTIONS.SIGNOUT_SUCCESS,
        payload: res.data.token
      });
      history.push("/");
      notification[res.data.alert.type]({
        top:80,
        message: res.data.alert.message,
      })
    }
  } catch (error) {
  } finally {
  }
}
function* signOutListener() {
  yield takeLeading(ACTIONS.REQUEST_SIGNOUT, signOutHandler);
}

function* signupHandler(action) {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
    history,
    setServerErrors
  } = action.payload;
  try {
    const res = yield call(signUp, {
      name,
      username,
      email,
      password,
      confirmPassword
    });
    switch (res.status) {
      case 200:
        yield put({
          type: ACTIONS.SIGNUP_SUCCESS,
          payload: res.data
        });
        history.push("/");
        notification[res.data.alert.type]({
          top:80,
          message: res.data.alert.message,
        })
        break;
      case 422:
        setServerErrors(res.data);
        break;
      default:
        break;
    }
  } catch (error) {
  } finally {
  }
}

function* signUpListener() {
  yield takeLeading(ACTIONS.REQUEST_SIGNUP, signupHandler);
}

function* editUserHandler(action) {
  const {
    name,
    setServerErrors,
  } = action.payload;
  try {
    const res = yield call(editUser, {
      name
    });
    switch (res.status) {
      case 200:
        yield put({
          type: ACTIONS.EDITUSER_SUCCESS,
          payload: res.data,
        });
        notification[res.data.alert.type]({
          top:80,
          message: res.data.alert.message,
        })
        break;
      case 422:
        setServerErrors(res.data);
        break;
      case 403:
        notification[res.data.alert.type]({
          top:80,
          message: res.data.alert.message,
          description: res.data.alert.description
        })
          break;    
      default:
        break;
    }
  } catch (error) {
  } finally {
  }
}
function* editUserListener() {
  yield takeLeading(ACTIONS.REQUEST_EDITUSER, editUserHandler);
}
function* changePasswordHandler(action) {
  const {
    oldPassword,
    password,
    setServerErrors,
    setShowPassword
  } = action.payload;
  try {
    const res = yield call(changePassword, {
      oldPassword,
      password
    });
    switch (res.status) {
      case 200:
        yield put({
          type: ACTIONS.CHANGEPASSWORD_SUCCESS,
          payload: res.data,
        });
        setShowPassword(false);
        notification[res.data.alert.type]({
          top:80,
          message: res.data.alert.message,
        })
        break;
      case 422:
        setServerErrors(res.data);
        break;
      case 403:
        notification[res.data.alert.type]({
          top:80,
          message: res.data.alert.message,
          description: res.data.alert.description
        })
          break;
      default:
        break;
    }
  } catch (error) {
  } finally {
  }
}
function* changePasswordListener() {
  yield takeLeading(ACTIONS.REQUEST_CHANGEPASSWORD, changePasswordHandler);
}

function* addTasKHandler(action) {
  const {
    title,
    details,
    start_time,
    end_time,
    history,
  } = action.payload;
  try {
    const res = yield call(addTasks, {
      title,
      details,
      start_time,
      end_time,
    });
    switch (res.status) {
      case 200:
        yield put({
          type: ACTIONS.ADDTASK_SUCCESS,
          payload: res.data
        });
        // history.push("/");
        notification[res.data.alert.type]({
          top:80,
          message: res.data.alert.message,
        })
        break;
      case 422:
        break;
      case 403:
        notification[res.data.alert.type]({
          top:80,
          message: res.data.alert.message,
          description: res.data.alert.description
        })
          break;  
      default:
        break;
    }
  } catch (error) {
  } finally {
  }
}

function* adddTaskListener() {
  yield takeLeading(ACTIONS.REQUEST_ADDTASK, addTasKHandler);
}

function* deleteAccountHandler(action) {
  const { history } = action.payload;
  try {
    const res = yield call(deleteAccount);
    switch (res.status) {
      case 200:
        yield put({
          type: ACTIONS.DELETEACCOUNT_SUCCESS,
          payload: res.data
        });
        history.push("/");
        notification[res.data.type]({
          top:80,
          message: res.data.message,
        })
        break;
      case 422:
        notification[res.data.type]({
          top:80,
          message: res.data.message,
        })
        break;
      case 403:
        notification[res.data.type]({
          top:80,
          message: res.data.message,
        })
          break;  
      default:
        break;
    }
  } catch (error) {
  } finally {
  }
}
function* deleteAccountListener() {
  yield takeLeading(ACTIONS.REQUEST_DELETEACCOUNT, deleteAccountHandler);
}

export default [
  signInListener,
  signOutListener,
  signUpListener,
  editUserListener,
  changePasswordListener,
  adddTaskListener,
  deleteAccountListener
];
