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
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(routes);
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
