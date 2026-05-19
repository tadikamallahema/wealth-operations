import express from 'express';
import dotenv from 'dotenv';
import './config/pgManager.js';
import { createTable } from './models/schema.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/pgManager.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
await connectDB();
//await createTable();

app.use('/api/auth',authRoutes);

app.listen(4004, () => {
  console.log("Server is running on port 4004");
});