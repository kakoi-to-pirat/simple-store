import React from "react";
import { render } from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { watchInc } from "./store/sagas";
import { increment, asyncIncrement, decrement, rootReducer } from "./store";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(watchInc);

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const status = useSelector((state) => state.status);

  return (
    <>
      <h1>Simple store</h1>
      <div>
        <div>Status: {status.message}</div>
        <div>Count: {count}</div>
        <button
          onClick={() => dispatch(increment(1))}
          style={{ width: "30px" }}
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement(1))}
          style={{ width: "30px" }}
        >
          -
        </button>
        <button
          onClick={() => dispatch(asyncIncrement())}
          style={{ width: "120px" }}
        >
          async +
        </button>
      </div>
    </>
  );
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
