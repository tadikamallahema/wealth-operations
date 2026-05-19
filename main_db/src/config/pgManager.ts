import dotenv from 'dotenv';
dotenv.config();
import { Client } from 'pg';

const client = new Client({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.uqxsleospestpmjsizjm',
  password: process.env.PASSWORD,
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
})
export async function connectDB() {
  try {
    await client.connect();
    console.log('Database connected');
  } catch (err) {
    console.error('DB connection failed:', err);
  }
}
export default client;