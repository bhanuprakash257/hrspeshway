import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
// import other routers
import connectToDatabase from "./db/db.js";

dotenv.config();
connectToDatabase();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.resolve("public", "uploads")));
app.use("/assets", express.static(path.resolve("assets")));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server running" });
});

app.use("/api/auth", authRouter);
// mount other routers similarly

export default app; // Important for serverless-http
