import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import { increment, asyncIncrement, decrement, rootReducer } from "./store";
import { watchInc } from "./store/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

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

getElement("asyncIncBtn").addEventListener("click", () => {
  store.dispatch(asyncIncrement());
});

sagaMiddleware.run(watchInc);

store.subscribe(render);

render();
