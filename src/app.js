import React from "react";
import { Observer } from "mobx-react-lite";
import store from "./store.js";

const App = () => (
  <Observer>
    {() => (
      <>
        <h1>Simple store</h1>
        <div className="app">
          <div className="app__status">
            Status: <span>{store.status.message}</span>
          </div>
          <div className="app__counter">
            Count: <span>{store.count}</span>
          </div>
          <button
            className="app__inc-btn"
            onClick={() => store.increment(1)}
            style={{ width: "30px" }}
          >
            +
          </button>
          <button
            className="app__dec-btn"
            onClick={() => store.decrement(1)}
            style={{ width: "30px" }}
          >
            -
          </button>
          <button
            className="app__async-inc-btn"
            onClick={() => store.asyncIncrement()}
            style={{ width: "120px" }}
          >
            async +
          </button>
        </div>
      </>
    )}
  </Observer>
);

export default App;
