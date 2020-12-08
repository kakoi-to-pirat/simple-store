import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as GetBook from "~/graphql/GetBook.graphql";

export default ({ id }) => {
  const { data } = useQuery(GetBook, { variables: { id } });

  const book = data?.getBook;

  const bookTitle = () => (
    <div>
      <h3>{book.title}</h3>
    </div>
  );

  return book ? bookTitle() : "Loading...";
};
