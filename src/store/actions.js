import {
  INCREMENT,
  DECREMENT,
  ASYNC_INCREMENT,
  IS_LOADING,
  IS_LOADED,
  IS_LOADING_STATUS,
  IS_LOADED_STATUS,
} from "./constants";

export const increment = (count) => ({
  type: INCREMENT,
  payload: count,
});

export const decrement = (count) => ({
  type: DECREMENT,
  payload: count,
});

export const asyncIncrement = () => {
  return {
    type: ASYNC_INCREMENT,
  };
};

export const toLoading = (status = IS_LOADING_STATUS) => ({
  type: IS_LOADING,
  payload: { status },
});

export const toLoaded = (status = IS_LOADED_STATUS) => ({
  type: IS_LOADED,
  payload: { status },
});

export default { increment, asyncIncrement, decrement };