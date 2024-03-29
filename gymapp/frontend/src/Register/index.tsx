import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import backgroundImage from "@/assets/weights.jpeg";

const REGISTER_USER = gql`
  mutation RegisterUser($input: UserInput!) {
    registerUser(input: $input) {
      id
      username
      email
    }
  }
`;

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ variables: { input: formData } });
      // Handle successful registration (e.g., show success message, redirect to login page)
      console.log("User registered successfully!");
      // Reset form fields after successful registration
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      // Set registration complete message
      setRegistrationComplete(true);
    } catch (err: any) {
      // Handle registration error
      console.error("Registration failed:", err.message);
    }
  };

  return (
    <>
      <div
        className="h-full w-full bg-darkblue"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="">
          <button className="font-montserrat mt-3 ml-3 w-[100px] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            <a href="/">Return</a>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full font-montserrat mt-[-200px]">
          <h1 className="text-2xl my-5 font-montserrat font-bold text-gray-200">
            CREATE AN ACCOUNT
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-gray-200">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-white bg-opacity-80 w-full px-4 py-2 text-slate-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-3 text-gray-200">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white bg-opacity-80 w-full px-4 py-2 border text-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-3 text-gray-200">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white bg-opacity-80 w-full px-4 py-2 border text-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col items-center mx-auto justify-center mt-5">
              <button
                type="submit"
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Register
              </button>
              {loading && <p>Loading...</p>}
              {error && (
                <p className="max-w-[300px] text-center mt-3 text-red-500 text-sm">
                  Error: {error.message}
                </p>
              )}
              <div>
                {registrationComplete && (
                  <p className="text-green-500 mb-2 mt-3">
                    Registration complete ✔
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
