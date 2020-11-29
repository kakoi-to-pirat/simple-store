import {
  INCREMENT,
  DECREMENT,
  IS_LOADING,
  IS_LOADED,
  IS_LOADING_STATUS,
  IS_LOADED_STATUS,
} from "./constants";

export const increment = (count = 1) => ({
  type: INCREMENT,
  payload: count,
});

export const decrement = (count = 1) => ({
  type: DECREMENT,
  payload: count,
});

export const asyncIncrement = () => async (dispatch) => {
  dispatch(toLoading());

  const count = await new Promise((resolve, reject) =>
    setTimeout(() => resolve(1), 1500)
  );

  dispatch(increment(count));
  dispatch(toLoaded());
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
