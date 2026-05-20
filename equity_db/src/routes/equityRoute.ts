import express from "express";
import {
  fetchAllHoldings,
  fetchAllTransactions,
  fetchAllUsers,
  getHoldings,
  getMarket,
  getTransactions,
} from "../controllers/equityController.js";

const equityRouter = express.Router();
equityRouter.get("/users",fetchAllUsers)
equityRouter.get("/holdings/:pan_no", getHoldings);
equityRouter.get("/transactions/:pan_no", getTransactions);
equityRouter.get("/market", getMarket);
equityRouter.get("/holdings",fetchAllHoldings)
equityRouter.get("/transactions",fetchAllTransactions)

export default equityRouter;
