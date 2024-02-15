import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    isActive: Boolean!
    workouts: [Workout!]
  }

  type Workout {
    id: ID!
    name: String!
    description: String!
    calories: Int!
  }

  type Query {
    getUser: [User!]!
  }
`;
