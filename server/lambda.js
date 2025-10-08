import serverless from "serverless-http";
import app from "./index.js";         // Your existing Express app
import connectToDatabase from "./db/db.js";
import userSeed from "./userSeed.js";

// Initialize database and seed admin user
const initialize = async () => {
  await connectToDatabase();
  await userSeed(); // Runs only once
};

initialize();

export const handler = serverless(app);
