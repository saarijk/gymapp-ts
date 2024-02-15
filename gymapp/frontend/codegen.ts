/*
    This file should contain instructions that tell the GraphQL Code Generator what we want
    it to do. 
*/

import { CodegenConfig } from "@graphql-codegen/cli";
//import { getApiUrl } from "../frontend/src/services";

const config: CodegenConfig = {
  schema: "http://localhost:4000/",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
