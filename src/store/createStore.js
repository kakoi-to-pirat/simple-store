export const createStore = (reducer, initialState = {}) => {
  let state = initialState;
  let subscribers = [];

  const store = {
    dispatch: (action) => {
      state = reducer(state, action);
      subscribers.forEach((sub) => sub());
    },
    subscribe: (sub) => {
      subscribers = [...subscribers, sub];
    },
    getState: () => state,
  };

  return store;
};
