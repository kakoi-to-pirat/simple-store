import React from "react";
import { render } from "react-dom";
import { observable } from "mobx";
import { useObserver } from "mobx-react-lite";

const state = observable({
  count: 0,

  status: {
    isLoading: false,
    message: "Loaded",
  },

  increment() {
    this.count++;
  },

  decrement() {
    this.count--;
  },

  toLoading() {
    this.status.isLoading = true;
    this.status.message = "Loading";
  },

  toLoaded() {
    this.status.isLoading = false;
    this.status.message = "Loaded";
  },

  async asyncIncrement() {
    this.toLoading();

    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(this.increment()), 1500)
    );

    this.toLoaded();
  },
});

const App = () => {
  return useObserver(() => (
    <>
      <h1>Simple store</h1>
      <div>
        <div>Status: {state.status.message}</div>
        <div>Count: {state.count}</div>
        <button onClick={() => state.increment(1)} style={{ width: "30px" }}>
          +
        </button>
        <button onClick={() => state.decrement(1)} style={{ width: "30px" }}>
          -
        </button>
        <button
          onClick={() => state.asyncIncrement()}
          style={{ width: "120px" }}
        >
          async +
        </button>
      </div>
    </>
  ));
};

render(<App />, document.getElementById("app"));
