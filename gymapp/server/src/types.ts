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
  createdAt: string;
  name: string;
  description: string;
  calories: number;
  userId: string;
}

export interface WorkoutInput {
  name: string;
  description: string;
  calories: number;
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

export interface DecodedToken {
  userId: string;
  username: string;
}
