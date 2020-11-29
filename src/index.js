import { createStore, createEvent, createEffect } from "effector";

const LOADING_MESSAGE = "Loading";
const LOADED_MESSAGE = "Loaded";

const initalState = {
  count: 0,
  status: { isLoading: false, message: LOADED_MESSAGE },
};

const increment = createEvent();
const decrement = createEvent();
const asyncIncrement = createEffect(
  (count) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(count), 1500))
);

const state = createStore(initalState)
  .on(increment, (oldState, count) => ({
    ...oldState,
    count: oldState.count + count,
  }))
  .on(asyncIncrement.finally, (oldState, { result }) => ({
    ...oldState,
    count: oldState.count + result,
    status: { isLoading: false, message: LOADED_MESSAGE },
  }))
  .on(asyncIncrement, (oldState) => ({
    ...oldState,
    status: { isLoading: true, message: LOADING_MESSAGE },
  }))
  .on(decrement, (oldState, count) => ({
    ...oldState,
    count: oldState.count - count,
  }));

const getElement = (id) => document.getElementById(id);

const render = (state) => {
  getElement("status").textContent = state.status.message;
  getElement("counterInput").textContent = state.count.toString();
};

getElement("incBtn").addEventListener("click", () => increment(1));

getElement("decBtn").addEventListener("click", () => decrement(1));

getElement("asyncIncBtn").addEventListener("click", () => asyncIncrement(1));

state.watch(render);
