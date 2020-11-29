import { combineReducers } from "redux";
import {
  INCREMENT,
  DECREMENT,
  IS_LOADING,
  IS_LOADED,
  IS_LOADED_STATUS,
} from "./constants";

const count = (state = 0, action) => {
  const { payload = 1 } = action;
  switch (action.type) {
    case INCREMENT:
      return state + payload;
    case DECREMENT:
      return state - payload;
    default:
      return state;
  }
};

const status = (
  state = { message: IS_LOADED_STATUS, isLoading: false },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
        message: payload.status,
      };
    case IS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: payload.status,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ count, status });

export default rootReducer;
