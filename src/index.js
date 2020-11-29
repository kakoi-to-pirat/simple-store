import { autorun, observable } from "mobx";

const state = observable({
  count: 0,
  status: {
    isLoading: false,
    message: "",
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
  asyncIncrement() {
    this.toLoading();
    setTimeout(() => {
      this.increment();
      this.toLoaded();
    }, 1500);
  },
});

const getElement = (id) => document.getElementById(id);

const render = () => {
  getElement("status").textContent = state.status.message;
  getElement("counterInput").textContent = state.count.toString();
};

getElement("incBtn").addEventListener("click", () => state.increment());

getElement("decBtn").addEventListener("click", () => state.decrement());

getElement("asyncIncBtn").addEventListener("click", () =>
  state.asyncIncrement()
);

autorun(render);
