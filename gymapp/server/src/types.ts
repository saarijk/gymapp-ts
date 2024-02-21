// user registration
export interface UserInput {
  username: string;
  email: string;
  password: string;
}

// login
export interface LoginInput {
  username: string;
  password: string;
}

// Workout interface
export interface Workout {
  id: string;
  name: string;
  description: string;
  calories: number;
  userId: string;
}

// User interface
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  workouts: Workout[];
}
