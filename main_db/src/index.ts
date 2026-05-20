import express from 'express';
import dotenv from 'dotenv';
import './config/pgManager.js';
import { createTable } from './models/schema.js';
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/pgManager.js';
import cors from 'cors';
import http from "http";
import { initSocket } from "./config/socket.js";
import { socketHandler }from "./sockets/socketHandler.js";
import { socketAuth }from "./sockets/socketAuth.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
const server =http.createServer(app);
const io = initSocket(server);

//io.use(socketAuth);

socketHandler(io);
await connectDB();
//await createTable();

app.use('/api/auth',authRoutes);
app.use('/api/portfolio', portfolioRoutes);

server.listen(4004, () => {
  console.log("Server is running on port 4004");
});