import { SET_USER } from "../actions";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
      break;

    default:
      return state;
      break;
  }
};

export default userReducer;
