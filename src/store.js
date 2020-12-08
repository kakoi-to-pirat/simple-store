import React, { useReducer } from "react";
import { createContext, useContext } from "react";
import {
  INCREMENT,
  DECREMENT,
  IS_LOADING,
  IS_LOADED,
  IS_LOADED_STATUS,
  IS_LOADING_STATUS,
} from "./constants";

const initialState = {
  count: 0,

  status: {
    isLoading: false,
    message: IS_LOADED_STATUS,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case IS_LOADING:
      return {
        ...state,
        status: {
          isLoading: true,
          message: IS_LOADING_STATUS,
        },
      };
    case IS_LOADED:
      return {
        ...state,
        status: {
          isLoading: false,
          message: IS_LOADED_STATUS,
        },
      };
    default:
      return state;
  }
};

const Store = createContext();

export const useStore = () => ({
  store: useContext(Store),
});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;
