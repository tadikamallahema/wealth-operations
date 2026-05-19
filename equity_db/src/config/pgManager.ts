import dotenv from 'dotenv';
dotenv.config();
import { Client } from 'pg';
//const password="JiNxvt7+aaXUP6h"
//console.log(process.env.PASSWORD);
const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
})
 async function run() {
  await client.connect()
  console.log("database connected succcess")
}
run() 
export default client;