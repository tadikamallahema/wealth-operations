import express from "express";
import dotenv from "dotenv";
import "./config/pgManager.js";
import equityRouter from "./routes/equityRoute.js";
import cors from "cors";

dotenv.config();
const port: number = Number(process.env.SERVER_PORT);

const app = express();

app.use(
  cors({
    origin: "http://localhost:4004",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/equity", equityRouter);

app.get("/", (req, res) => {
  res.send("Equity service is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
