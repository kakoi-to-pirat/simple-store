import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./app";
import StoreProvider from "./store";

const client = new ApolloClient({
  uri: "http://localhost:6006/graphql?",
});

render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById("app")
);
