import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose
  .connect(process.env.DB)
  .then(() => console.log("Database connected."))
  .catch(() => console.log("Failed to connect with database."));

import express from "express";
import SchoolRouter from "./router/school.router.js";
const app = express();

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/school", SchoolRouter);
