import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { pool } from "./config/db";
import {connectRedis} from "./config/redis";
import fundsRoutes from "./routes/funds.routes";
import investorsRoutes from "./routes/investors.routes";
import sipsRoutes from "./routes/sips.routes";
import transactionsRoutes from "./routes/transactions.routes";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5002;


// Middlewares
app.use(cors());

app.use(express.json());


// Routes
app.use("/funds", fundsRoutes);
app.use("/investors", investorsRoutes);
app.use("/sips", sipsRoutes);
app.use("/transactions", transactionsRoutes);

// Start Server
async function startServer() {

  try {

    // Database Connection Test
    const client = await pool.connect();

    console.log("PostgreSQL Connected ✅");

    client.release();

    // Start Express Server
    app.listen(PORT, () => {

      console.log(
        `Mutual Funds Service Running on Port ${PORT} 🚀`
      );

    });

  } catch (error) {

    console.log("Database Connection Failed ❌");

    console.error(error);

  }

}

connectRedis().then(() => {
  startServer();
});