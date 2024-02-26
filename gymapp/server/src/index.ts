import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
//import { addMocksToSchema } from "@graphql-tools/mock";
//import { makeExecutableSchema } from "@graphql-tools/schema";
//import data from "./data/mocks.json";
import resolvers from "./resolvers";
import { jwtDecode } from "jwt-decode";
import { IncomingMessage } from "http";

/*const mocks = {
  Query: () => ({
    users: () => data.users,
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
}*/

interface MyContext {
  authScope?: String;
}

async function startApolloServer() {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => ({
      authScope: req.headers.authorization,
    }),
  });
  console.log(`Server is running at ${url}`);
}

startApolloServer();
