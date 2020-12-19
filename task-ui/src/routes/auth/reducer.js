import ACTIONS from "./actions/types";

const initialState = {
  authenticated: false,
  user: null,
  accessToken: null,
  alert: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SIGNIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        accessToken: action.payload.token,
        user: action.payload.user
      };
    case ACTIONS.SIGNUP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        accessToken: action.payload.token,
        user: action.payload.user
      };
    case ACTIONS.EDITUSER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
     
    case ACTIONS.SIGNOUT_SUCCESS:
      return initialState;
    case ACTIONS.DELETEACCOUNT_SUCCESS:
      return initialState;  
    default:
      return state;
  }
};
