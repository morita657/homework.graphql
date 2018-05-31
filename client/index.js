import { createApolloFetch } from "apollo-fetch";

const uri = "http://api.githunt.com/graphql";
const apolloFetch = createApolloFetch({ uri });
apolloFetch.then((data) => {
  console.log(data);
  return data;
});
