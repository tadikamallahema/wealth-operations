import dotenv from 'dotenv';
dotenv.config();
import { Client } from 'pg';
//const password="JiNxvt7+aaXUP6h"
//console.log(process.env.PASSWORD);
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
 async function run() {
  await client.connect()
  const res = await client.query('SELECT * from equity_users')
  console.log(res.rows);
}
run() 
export default client;