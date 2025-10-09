import dotenv from "dotenv";
dotenv.config(); // Load .env first

import connectToDatabase from "./db/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const userRegister = async () => {
  try {
    const db = await connectToDatabase(); // make sure this returns the mongoose connection

    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      console.log("Admin user already exists.");
    } else {
      const hashPassword = await bcrypt.hash("admin", 10);

      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin",
      });

      await newUser.save();
      console.log("Admin user created successfully!");
    }

    // ✅ Close DB connection and exit
    db.connection.close(() => {
      console.log("Database connection closed.");
      process.exit(0);
    });

  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1); // exit with error
  }
};

userRegister();


