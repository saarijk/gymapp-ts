/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateWorkout($input: WorkoutInput!) {\n    createWorkout(input: $input) {\n      name\n      description\n      calories\n    }\n  }\n": types.CreateWorkoutDocument,
    "\n  mutation LoginUser($input: LoginInput!) {\n    loginUser(input: $input) {\n      token\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation RegisterUser($input: UserInput!) {\n    registerUser(input: $input) {\n      id\n      username\n      email\n    }\n  }\n": types.RegisterUserDocument,
    "\n  query UserWorkouts($userId: ID!) {\n    userWorkouts(userId: $userId) {\n      id\n      name\n      description\n      calories\n      userId\n    }\n  }\n": types.UserWorkoutsDocument,
    "\nquery GetUser {\n    users {\n      id\n      username\n      email\n      password\n      isActive\n      workouts {\n        id\n        name\n        description\n        calories\n      }\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateWorkout($input: WorkoutInput!) {\n    createWorkout(input: $input) {\n      name\n      description\n      calories\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWorkout($input: WorkoutInput!) {\n    createWorkout(input: $input) {\n      name\n      description\n      calories\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginUser($input: LoginInput!) {\n    loginUser(input: $input) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($input: LoginInput!) {\n    loginUser(input: $input) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterUser($input: UserInput!) {\n    registerUser(input: $input) {\n      id\n      username\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($input: UserInput!) {\n    registerUser(input: $input) {\n      id\n      username\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserWorkouts($userId: ID!) {\n    userWorkouts(userId: $userId) {\n      id\n      name\n      description\n      calories\n      userId\n    }\n  }\n"): (typeof documents)["\n  query UserWorkouts($userId: ID!) {\n    userWorkouts(userId: $userId) {\n      id\n      name\n      description\n      calories\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetUser {\n    users {\n      id\n      username\n      email\n      password\n      isActive\n      workouts {\n        id\n        name\n        description\n        calories\n      }\n    }\n  }\n"): (typeof documents)["\nquery GetUser {\n    users {\n      id\n      username\n      email\n      password\n      isActive\n      workouts {\n        id\n        name\n        description\n        calories\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;