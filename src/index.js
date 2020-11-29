import { autorun, observable } from "mobx";

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
