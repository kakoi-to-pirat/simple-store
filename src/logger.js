export const logger = (state) => (next) => (action) => {
  console.log({ prevState: state.getState(), action, next });
  return next(action);
};

export default logger;
