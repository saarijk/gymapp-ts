import React, { useState, useEffect } from "react";

import { useMutation, gql } from "@apollo/client";

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
    <div className="flex w-5/6 items-center mx-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="mt-6">
          <label htmlFor="username" className="block text-md mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mt-6">
          <label htmlFor="password" className="block text-md mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500">{errorMessage}</p>}
      </form>
      <div className="w-full max-w-md mx-auto mt-4">
        <p className="text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
