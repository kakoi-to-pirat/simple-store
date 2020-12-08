import React, { useState } from "react";
import { createContext, useContext } from "react";

const initialState = {
  count: 0,

  status: {
    isLoading: false,
    message: "Loaded",
  },

  increment() {
    this.count++;
    return this;
  },

  decrement() {
    this.count--;
    return this;
  },

  toLoading() {
    this.status.isLoading = true;
    this.status.message = "Loading";
    return this;
  },

  toLoaded() {
    this.status.isLoading = false;
    this.status.message = "Loaded";
    return this;
  },

  async asyncIncrement() {
    this.toLoading();

    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(this.increment()), 1500)
    );

    this.toLoaded();
  },
};

const Store = createContext();

export const useStore = () => ({
  store: useContext(Store),
});

export const StoreProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const dispatch = (action) => setState((prev) => ({ ...prev, action }));

  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  );
};

export default StoreProvider;
