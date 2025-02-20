import connectDB from "./utils/dbConnect";
import cors from "cors";
import express from "express";
import { routes } from "./routes";
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from React app
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.json());
app.use(routes);
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
