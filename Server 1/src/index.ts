import express from 'express';
import dotenv from 'dotenv';
import './config/pgManager.js';

dotenv.config();

const app = express();

app.use(express.json());

app.listen(4004, () => {
  console.log("Server is running on port 4004");
});