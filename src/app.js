import React from "react";

import { useStore } from "./store.js";

const App = () => {
  const { store } = useStore();
  const { state, dispatch } = store;

  console.log({ store });

  return (
    <>
      <h1>Simple store</h1>
      <div className="app">
        <div className="app__status">
          Status: <span>{state.status.message}</span>
        </div>
        <div className="app__counter">
          Count: <span>{state.count}</span>
        </div>
        <button
          className="app__inc-btn"
          onClick={() => dispatch(state.increment())}
          style={{ width: "30px" }}
        >
          +
        </button>
        <button
          className="app__dec-btn"
          onClick={() => dispatch(state.decrement())}
          style={{ width: "30px" }}
        >
          -
        </button>
        <button
          className="app__async-inc-btn"
          onClick={async () => dispatch(await state.asyncIncrement())}
          style={{ width: "120px" }}
        >
          async +
        </button>
      </div>
    </>
  );
};

export default App;
