import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "../LogoutButton";
import AddNewWorkout from "../AddNewWorkout";
import { useVisbility } from "../Contexts/VisibilityContext";
import { useData } from "../Contexts/DataContext";
import backgroundImage from "@/assets/weights.jpeg";

type ID = string;

const GET_USER_WORKOUTS = gql`
  query UserWorkouts($userId: ID!) {
    userWorkouts(userId: $userId) {
      id
      createdAt
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
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [shouldAutoRefresh, setShouldAutoRefresh] = useState<boolean>(false);

  const { setUserId, data, loading, error } = useData();
  const { setCreateform, createForm } = useVisbility();

  const toggleAddForm = () => {
    setShowAddForm((prevShowAddForm) => !prevShowAddForm);
  };

  // Function to refetch user workouts
  //const { loading, error, data, refetch } = useQuery(GET_USER_WORKOUTS, {
  //  variables: { userId: userId },
  //  pollInterval: 500,
  //});

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="h-full ">
      <div
        className="flex justify-between items-center bg-darkblue h-[100px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {username && (
          <h1 className="px-3 font-montserrat text-3xl text-gray-200">
            Hello <span className="font-bold">{username}</span>, welcome back!
          </h1>
        )}
        <div className="">
          <LogoutButton />
        </div>
      </div>
      <div className="w-5/6 flex flex-col mx-auto mt-[50px]">
        <h1 className="font-bold text-3xl p-3 font-montserrat">
          YOUR WORKOUTS
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {data.userWorkouts.map((workout: any) => (
            <div
              key={workout.id}
              className="border border-gray-600 rounded-md p-3 mb-4"
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-bold font-montserrat mb-2">
                  {workout.name}
                </h2>
                <p className="text-sm text-slate-500">{workout.createdAt}</p>
              </div>
              <p className="font-dmsans">{workout.description}</p>
              <p className="font-dmsans">Calories: {workout.calories}</p>
            </div>
          ))}
        </div>

        {/* if no workouts */}
        {data.userWorkouts.length === 0 && (
          <p className="p-3 italic">No workouts found.</p>
        )}
        <div>
          {!createForm && (
            <button
              onClick={() => {
                setCreateform(true);
              }}
              className="mt-6 w-1/4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add New Workout
            </button>
          )}
          {createForm && <AddNewWorkout />}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
