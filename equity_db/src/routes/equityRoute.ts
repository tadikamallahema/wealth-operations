import express from "express";
import {
  getHoldings,
  getMarket,
  getTransactions,
} from "../controllers/equityController.js";

const equityRouter = express.Router();

equityRouter.get("/holdings/:pan_no", getHoldings);
equityRouter.get("/transactions/:pan_no", getTransactions);
equityRouter.get("/market", getMarket);

export default equityRouter;
