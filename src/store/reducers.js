import { combineReducers } from "redux";
import { INCREMENT, DECREMENT, IS_LOADING, IS_LOADED, IS_LOADED_STATUS } from "./constants";

const count = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      console.log(action.payload);
      return state + action.payload;
    case DECREMENT:
      return state - action.payload;
    default:
      return state;
  }
};

const status = (state = { message: IS_LOADED_STATUS, isLoading: false }, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
        message: action.payload.status,
      };
    case IS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: action.payload.status,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ count, status });

export default rootReducer;
