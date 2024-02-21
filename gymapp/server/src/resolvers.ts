import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import validator from "validator";
import jwt from "jsonwebtoken";
import { UserInput, User, Workout, LoginInput } from "./types";

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

const resolvers = {
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
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return { token };
    },
  },
};

export default resolvers;
