import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../src/app.js";

jest.useFakeTimers();

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("App", () => {
  it("render counter", async () => {
    await act(async () => await render(<App />, container));

    const appIncBtn = container.querySelector("button.app__inc-btn");
    const appAsyncIncBtn = container.querySelector("button.app__async-inc-btn");

    const clickEvent = new MouseEvent("click", { bubbles: true });

    expect(container.querySelector(".app__status span").textContent).toBe(
      "Loaded"
    );

    expect(container.querySelector(".app__counter span").textContent).toBe("0");

    await act(async () => appIncBtn.dispatchEvent(clickEvent));

    expect(container.querySelector(".app__counter span").textContent).toBe("1");

    await act(async () => appAsyncIncBtn.dispatchEvent(clickEvent));

    expect(container.querySelector(".app__status span").textContent).toBe(
      "Loading"
    );

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1500);
  });
});
