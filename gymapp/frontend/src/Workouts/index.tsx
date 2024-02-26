import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "../LogoutButton";
import AddNewWorkout from "../AddNewWorkout";

const GET_USER_WORKOUTS = gql`
  query UserWorkouts($userId: ID!) {
    userWorkouts(userId: $userId) {
      id
      name
      description
      calories
      userId
    }
  }
`;

type Props = {};

interface DecodedToken {
  username: string;
  userId: string;
}

const Workouts: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as DecodedToken;
        const data = JSON.parse(JSON.stringify(decodedToken)) as DecodedToken;
        console.log(data);
        setUserId(data.userId);
        setUsername(data.username);
        console.log("A:" + data.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const { loading, error, data } = useQuery(GET_USER_WORKOUTS, {
    variables: { userId: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between h-[50px] items-center ">
        {username && (
          <h1 className="px-3">
            Hello, <span className="font-bold">{username}</span>! Welcome back!
          </h1>
        )}
        <LogoutButton />
      </div>
      <div className="w-5/6 flex flex-col  mx-auto mt-[50px]">
        <h1 className="font-bold p-3">Your workouts:</h1>
        {data.userWorkouts.map((workout: any) => (
          <div key={workout.id} className="border p-3 mb-4">
            <h2 className="text-xl font-bold">{workout.name}</h2>
            <p className="text-gray-600">{workout.description}</p>
            <p className="text-gray-600">Calories: {workout.calories}</p>
          </div>
        ))}

        {/* if no workouts */}
        {data.userWorkouts.length === 0 && (
          <p className="p-3 italic">No workouts found.</p>
        )}
        <div>
          {!showAddForm && (
            <button
              onClick={toggleAddForm}
              className="mt-6 w-1/4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add New Workout
            </button>
          )}
          {showAddForm && <AddNewWorkout />}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
