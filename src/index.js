import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import {
  increment,
  asyncIncrement,
  decrement,
  rootReducer,
  toLoading,
  toLoaded,
} from "./store";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const getElement = (id) => document.getElementById(id);

const render = () => {
  getElement("status").textContent = store.getState().status.message;
  getElement("counterInput").textContent = store.getState().count.toString();
};

getElement("incBtn").addEventListener("click", () => {
  store.dispatch(increment(1));
});

getElement("decBtn").addEventListener("click", () => {
  store.dispatch(decrement(1));
});

getElement("asyncIncBtn").addEventListener("click", async () => {
  store.dispatch(asyncIncrement());
});

store.subscribe(render);

render();
