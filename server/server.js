const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const { buildSchema } = require("graphql");
const { readFileSync } = require("fs");

const schemaString = readFileSync("./schema.graphql", { encoding: "utf8" });

const schema = buildSchema(schemaString);

const allBooks = [
  {
    id: "1",
    title: "First book",
    description: "About nature",
    author: {
      id: "1",
      firstName: "Petr",
      lastName: "Petrov",
    },
  },
  {
    id: "2",
    title: "Second book",
    description: "About animals",
    author: {
      id: "1",
      firstName: "Petr",
      lastName: "Petrov",
    },
  },
];

const root = {
  getAllBooks: () => {
    return allBooks;
  },
  getBook: (params) => {
    return allBooks.find(({ id }) => params.id === id);
  },
  addBook: (params) => {
    allBooks.push({
      id: allBooks.length + 1,
      ...params.book,
      author: {
        id: "1",
        firstName: "Serg",
        lastName: "Spike",
      },
    });

    return true;
  },
};

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(6006);

console.log("Running a GraphQL API server at http://localhost:6006/graphql");
