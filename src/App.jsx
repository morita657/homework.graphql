import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Pokemon from "./Pokemon";

const client = new ApolloClient({
  // uri: "https://vm8mjvrnv3.lp.gql.zone/graphql"
  uri: "http://localhost:4000/graphql",
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Pokemon />
    </div>
  </ApolloProvider>
);

export default App;
