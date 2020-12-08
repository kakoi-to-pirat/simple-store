import React from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/react-hooks";
import * as GetAllBooks from "~/graphql/GetAllBooks.graphql";

export default ({ onSelect }) => {
  const { data, loading } = useQuery(GetAllBooks);
  const [addBook, { data: isAddedBook }] = useMutation(gql`
    mutation AddBook {
      addBook(book: { title: "Tigr", description: "About Tiger" })
    }
  `);

  return (
    <div>
      <h2>All books</h2>

      {loading && <div>Loading...</div>}

      {!loading && data.getAllBooks && (
        <ul>
          {data.getAllBooks.map((book, index) => (
            <li key={book.title + index}>
              {book.id}: {book.title} ({book.author.firstName}{" "}
              {book.author.lastName}){" "}
              <button onClick={() => onSelect(book)}>select</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => addBook({ variables: { type: "" } })}>
        add book
      </button>
    </div>
  );
};
