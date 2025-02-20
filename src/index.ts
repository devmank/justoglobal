import connectDB from "./utils/dbConnect";
import dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(routes);
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
