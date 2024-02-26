import { useMutation, gql } from "@apollo/client";
import React, { useState, ChangeEvent, FormEvent } from "react";

const ADD_WORKOUT = gql`
  mutation CreateWorkout($input: WorkoutInput!) {
    createWorkout(input: $input) {
      name
      description
      calories
    }
  }
`;

interface FormData {
  name: string;
  description: string;
  calories: number;
}

const AddNewWorkout: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    calories: 0,
  });

  const [createWorkout, { loading, error }] = useMutation(ADD_WORKOUT);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "calories" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: FormData) => {
    console.log(e);
    try {
      await createWorkout({ variables: { input: formData } });
      // Reset form data after successful submission
      setFormData({
        name: "",
        description: "",
        calories: 0,
      });
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div className="px-3">
      <div className="mt-6">
        <label htmlFor="name" className="block text-md mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="description" className="block text-md mb-2">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="calories" className="block text-md mb-2">
          Calories:
        </label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={() => handleSubmit(formData)}
        type="submit"
        className="mt-6 w-1/3 mb-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Adding Workout..." : "Add Workout"}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default AddNewWorkout;
