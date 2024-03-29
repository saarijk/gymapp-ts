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
    createdAt: String!
    name: String!
    description: String!
    calories: Int!
    userId: ID!
  }

  type AuthPayload {
    token: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input WorkoutInput {
    name: String!
    description: String!
    calories: Int!
  }

  type Query {
    users: [User!]!
    userWorkouts(userId: ID!): [Workout!]!
  }

  type Mutation {
    registerUser(input: UserInput!): User!
    loginUser(input: LoginInput!): AuthPayload!
    createWorkout(input: WorkoutInput!): Workout!
  }
`;
