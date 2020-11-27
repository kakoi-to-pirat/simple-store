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

const getStateCount = () => store.getState().count;
const getStateStatus = () => store.getState().status;

const render = () => {
  getElement("status").textContent = getStateStatus().message;
  getElement("counterInput").textContent = getStateCount().toString();
};

getElement("incBtn").addEventListener("click", () => {
  store.dispatch(increment(getStateCount()));
});

getElement("decBtn").addEventListener("click", () => {
  store.dispatch(decrement(getStateCount()));
});

getElement("asyncIncBtn").addEventListener("click", async () => {
  store.dispatch(asyncIncrement(getStateCount()));
});

store.subscribe(render);

render();
