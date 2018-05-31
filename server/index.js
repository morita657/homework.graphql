const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const path = require("path");
const bodyParser = require("body-parser");
const ApolloClient = require("apollo-boost");
const gql = require("graphql-tag");

// The data below is mocked.
const data = require("./data/pokemon.js");
const pokeballs = require("./data/pokeballs.js");
// The schema should model the full data object available.
const schema = buildSchema(`
  input PokemonInput {
    id: String
    name: String
  }
  input PokemonballInput {
    id: String
    name: String
  }
  type Pokemon {
    id: String
    name: String!
    weight: Weights
    weaknesses: [String]
    evolutions: [Evolution]
  }
  type Weights{
    minimum: String,
    maximum: String
  }
  type Evolution{
    id: Int,
    name: String
  }

  type Pokeballs {
    id: String
    name: String
    catch_rate: String
  }
  type Query {
    Pokemons: [Pokemon]
    Pokemon(name: String): Pokemon
    Pokeballs: [Pokeballs]
    getPokemon(id: String!): Pokemon
    getPokeballs(id: String!): Pokeballs
  }
  type Mutation {
    createPokemon(input: PokemonInput):Pokemon
    updatePokemon(id: String!, input: PokemonInput):Pokemon
    deletePokemon(id: String!, input: PokemonInput):Pokemon
    createPokeballs(input: PokeballsInput):Pokeballs
    updatePokeballs(id: String!, input: PokeballsInput):Pokeballs
    deletePokeballs(id: String!, input: PokeballsInput):Pokeballs
  }
`);

// The root provides the resolver functions for each type of query or mutation.
const root = {
  Pokemons: () => {
    return data;
  },
  Pokemon: (request) => {
    return data.find((pokemon) => pokemon.name === request.name);
  },
  Pokeballs: () => {
    return pokeballs;
  },
};

// Start your express server!
const app = express();

/*
  The only endpoint for your server is `/graphql`- if you are fetching a resource, 
  you will need to POST your query to that endpoint. Suggestion: check out Apollo-Fetch
  or Apollo-Client. Note below where the schema and resolvers are connected. Setting graphiql
  to 'true' gives you an in-browser explorer to test your queries.
*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use(express.static(path.join(__dirname, "../client")));
app.listen(4000);

console.log("Running a GraphQL API server at localhost:4000/graphql");
