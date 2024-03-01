import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import validator from "validator";
import jwt from "jsonwebtoken";
import {
  UserInput,
  User,
  Workout,
  LoginInput,
  WorkoutInput,
  DecodedToken,
} from "./types";

const USERS_FILE = path.join(__dirname, "data", "users.json");
const SECRET_KEY = "your-secret-key";

// to load users from file or initialise to empty array
let users: User[] = [];
try {
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  users = JSON.parse(data);
} catch (error) {
  console.error("Error reading users file:", error);
}

// Function to verify a JWT
function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

const resolvers = {
  Query: {
    userWorkouts: (
      _: any,
      { userId }: { userId: string },
      context: any
    ): Workout[] => {
      try {
        // Check if the user is authenticated
        let token = context.authScope as string;
        token = token.replace("Bearer ", "");
        const decodedToken = verifyToken(token);

        const decodedUser = decodedToken as DecodedToken;

        // Read user data from users.json
        let userData;
        try {
          userData = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
        } catch (error) {
          console.error("Error reading users file:", error);
          throw new Error("Failed to read user data");
        }

        // Find the user by ID
        const user = userData.find(
          (user: any) => user.id === decodedUser.userId
        );
        if (!user) {
          throw new Error("User not found");
        }

        // Return the workouts associated with the user
        return user.workouts || [];
      } catch (error) {
        // Log the error or handle it accordingly
        console.error("Error fetching user workouts:", error);
        // You might also want to throw the error here if you want to propagate it to the client
        throw new Error("Failed to fetch user workouts");
      }
    },
  },
  Mutation: {
    registerUser: (_: any, { input }: { input: UserInput }): User => {
      // generate id
      const id: string = uuidv4();

      if (!validator.isEmail(input.email)) {
        throw new Error("Invalid email format");
      }

      if (
        input.password.length < 8 ||
        !/\d/.test(input.password) ||
        !/[a-zA-Z]/.test(input.password)
      ) {
        throw new Error(
          "Password must be at least 8 characters long and contain at least one letter and one number"
        );
      }

      // hash password
      const hashedPassword = bcrypt.hashSync(input.password, 10);

      // create new user
      const newUser: User = {
        id,
        username: input.username,
        email: input.email,
        password: hashedPassword,
        isActive: true,
        workouts: [],
      };

      // add new user
      users.push(newUser);

      // write to file
      try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
      } catch (error) {
        console.error("Error writing users file:", error);
      }

      return newUser;
    },
    loginUser: (
      _: any,
      { input }: { input: LoginInput }
    ): { token: string } => {
      const { username, password } = input;

      // Find the user in the user array by username
      const user = users.find((u) => u.username === username);
      if (!user) {
        // User not found
        throw new Error("User not found");
      }

      // Compare the hashed password with the provided password
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        // Passwords don't match
        throw new Error("Invalid password");
      }

      // Passwords match, generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return { token };
    },
    createWorkout: (
      _: any,
      { input }: { input: WorkoutInput },
      context: any
    ): Workout => {
      let token = context.authScope as string;
      token = token.replace("Bearer ", "");
      const decodedToken = verifyToken(token);
      console.log(decodedToken);

      const { name, description, calories } = input;
      const decodedUser = decodedToken as DecodedToken;

      // Read user data from users.json
      let userData;
      try {
        userData = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
      } catch (error) {
        console.error("Error reading users file:", error);
        throw new Error("Failed to read user data");
      }

      // Find the user by ID
      const userIndex = userData.findIndex(
        (user: any) => user.id === decodedUser.userId
      );
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const id: string = uuidv4();
      let date: Date = new Date();
      let createdAt: string = date.toLocaleDateString();

      // Create a new workout object
      const newWorkout: Workout = {
        id,
        createdAt,
        name,
        description,
        calories,
        userId: decodedUser.userId,
      };

      console.log(newWorkout);

      // Add the new workout to the user's workouts array
      userData[userIndex].workouts.push(newWorkout);

      // Write the updated user data back to users.json
      try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(userData, null, 2));
      } catch (error) {
        console.error("Error writing users file:", error);
        throw new Error("Failed to write user data");
      }

      return newWorkout;
    },
  },
};

export default resolvers;
