import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const mocks = {
  Query: () => ({
    getUser: () => [...new Array(3)],
  }),
  User: () => ({
    id: "user_01",
    username: "a_tiny_ant",
    email: "email@email.com",
    password: "Password1!",
    isActive: true,
    workouts: () => [
      {
        id: "workout_01",
        name: "running",
        description: "5k run around the lake",
        calories: 300,
      },
      {
        id: "workout_02",
        name: "gym session",
        description: "1 hour circuit training",
        calories: 500,
      },
    ],
  }),
};

async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    }),
  });
  const { url } = await startStandaloneServer(server);
  console.log(`Server is running. Query at ${url}`);
}

startApolloServer();
