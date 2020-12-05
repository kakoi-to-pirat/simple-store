import { observable } from "mobx";

const store = observable({
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

export default store;
