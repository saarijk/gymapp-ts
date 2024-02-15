import { useEffect } from "react";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";

const USERS = gql(`
query GetUser {
    users {
      id
      username
      email
      password
      isActive
      workouts {
        id
        name
        description
        calories
      }
    }
  }
`);

const Users = () => {
  const { loading, error, data } = useQuery(USERS);
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!data) return <div>No data available</div>;
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.users.map((user) => (
        <div key={user.id} className="border p-4">
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
          <p>
            isActive:{" "}
            <span
              className={`${user.isActive ? "text-green-500" : "text-red-500"}`}
            >
              {user.isActive ? "active" : "not active"}
            </span>
          </p>
          {user.workouts && user.workouts.length > 0 && (
            <div className="mt-2">
              <p>Workouts:</p>
              <ul className="grid grid-cols-2 gap-4">
                {user.workouts.map((workout) => (
                  <li key={workout.id}>
                    <p>Name: {workout.name}</p>
                    <p>Description: {workout.description}</p>
                    <p>Calories: {workout.calories}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default Users;
