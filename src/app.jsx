import React, { useState } from "react";
import { useStore } from "./store.jsx";
import { INCREMENT, DECREMENT, IS_LOADING, IS_LOADED } from "./constants";
import BooksList from "~/components/BooksList";
import Book from "~/components/Book";

const App = () => {
  const { store } = useStore();
  const { state, dispatch } = store;
  const [selectedBookId, setSelectedBookId] = useState();

  const asyncIncHandle = async () => {
    dispatch({ type: IS_LOADING });

    await new Promise((resolve, reject) => setTimeout(() => resolve(1), 1500));

    dispatch({ type: INCREMENT });
    dispatch({ type: IS_LOADED });
  };

  return (
    <>
      <h1>Simple store</h1>
      <div className="app">
        <div className="app__status">
          Status: <span>{state.status.message}</span>
        </div>
        <div className="app__counter">
          Count: <span>{state.count}</span>
        </div>
        <button
          className="app__inc-btn"
          onClick={() => dispatch({ type: INCREMENT })}
          style={{ width: "30px" }}
        >
          +
        </button>
        <button
          className="app__dec-btn"
          onClick={() => dispatch({ type: DECREMENT })}
          style={{ width: "30px" }}
        >
          -
        </button>
        <button
          className="app__async-inc-btn"
          onClick={() => asyncIncHandle()}
          style={{ width: "120px" }}
        >
          async +
        </button>
      </div>
      <div>
        <BooksList onSelect={(book) => setSelectedBookId(book.id)} />
        {selectedBookId && <Book id={selectedBookId} />}
      </div>
    </>
  );
};

export default App;