import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import backgroundImage from "@/assets/workout.jpeg";

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
    }
  }
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [redirectToWorkouts, setRedirectToWorkouts] = useState(false);
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const { data } = await loginUser({
        variables: { input: formData },
      });
      const { token } = data.loginUser;
      console.log(data);
      // store token locally
      localStorage.setItem("token", token);
      setRedirectToWorkouts(true);
    } catch (err: any) {
      console.error("Login failed:", err.message);
      setErrorMessage("Invalid username or password.");
    }
  };

  useEffect(() => {
    if (redirectToWorkouts) {
      window.location.href = "/workouts";
    }
  }, [redirectToWorkouts]);

  return (
    <div className="flex w-full items-center mx-auto">
      <div
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center custom-background"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
          width: "100%",
          maxWidth: "50%",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-[500px] max-w-md mx-auto px-[20px]"
        >
          <div className="mt-6">
            <label
              htmlFor="username"
              className="block text-md mb-2 text-white font-montserrat"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 text-slate-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-md mb-2 text-white font-montserrat"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 text-slate-700 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            className="mt-6 w-full bg-blue-500 text-white pt-2 pb-[6px] rounded-lg hover:bg-blue-600 transition duration-300 font-montserrat text-xl"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
          {error && <p className="text-red-500">{errorMessage}</p>}
        </form>
        <div className="w-full max-w-md mx-auto mt-4">
          <p className="text-center text-gray-300">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="ml-[25px]">
          <h1
            className="text-[140px] mr-[50px] rounded-lg font-montserrat font-bold bg-darkblue px-8 text-white"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(${backgroundImage})`,
            }}
          >
            FITLOG
          </h1>
          <p className="text-darkblue bg-white font-montserrat rounded-md text-md ml-[50px] p-3 flex justify-center border-darkblue border-[1px] mt-[-10px] mr-[25px]">
            TRACK YOUR FITNESS YOURNEY, ONE WORKOUT AT A TIME
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
