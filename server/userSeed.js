import User from "./models/User.js";
import bcrypt from "bcrypt";

const userSeed = async () => {
  try {
    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) return console.log("Admin already exists");

    const hashPassword = await bcrypt.hash("admin", 10);

    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin"
    });

    await newUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.log("Error in userSeed:", error);
  }
};

export default userSeed;

