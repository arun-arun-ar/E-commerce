// Load environment variables at the very beginning
import dotenv from 'dotenv';
dotenv.config();

// Import packages
import path from "path";
import express from 'express';
import cookieParser from "cookie-parser";

// Import database connection
import connectDB from "./config/db.js";

// Set port
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Server is successfully running on port ${port}`);
});
