import express from "express";
import dotenv from "dotenv";
import "./config/pgManager.js";
import equityRouter from "./routes/equityRoute.js";

dotenv.config();
const port: number = Number(process.env.SERVER_PORT);

const app = express();

app.use(express.json());
app.use("/api/equity", equityRouter);

app.get("/", (req, res) => {
  res.send("Equity service is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
