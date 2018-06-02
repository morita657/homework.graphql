import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Courses = () => (
  <Query
    query={gql`
      {
        Pokeballs {
          id
          name
          catch_rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading....</p>;
      if (error) return <p>Error...</p>;

      return data.Pokeballs.map(({ id, name, catch_rate }) => (
        <div key={id}>
          <p>{`${id} ${name} ${catch_rate}`}</p>
        </div>
      ));
    }}
  </Query>
);

export default Courses;
