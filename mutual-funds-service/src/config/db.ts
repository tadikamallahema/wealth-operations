import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
console.log(typeof process.env.DB_PASSWORD);
console.log(process.env.DB_PASSWORD);
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false
});



