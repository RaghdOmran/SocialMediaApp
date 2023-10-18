import { SET_USER, REMOVE_USER } from '../actions/types';

const initialState = {
  user: null,
  isAuthenticated: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer;
