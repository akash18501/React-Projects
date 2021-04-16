import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

const streamReducer = (state = {}, action) => {
  // console.log("current state is: ", state);
  // console.log("actions type is ", action.type);
  // console.log("payload is: ", action.payload);

  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};

export default streamReducer;
