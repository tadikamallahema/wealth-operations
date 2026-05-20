import { Router } from "express";

import {
  getAllTransactions,
  getTransactionById,
  getInvestorTransactions,
  purchaseFund,
  redeemFund
} from "../controllers/transactions.controller";

const router = Router();

router.get("/", getAllTransactions);

router.get("/:transactionId", getTransactionById);

router.get(
  "/investor/:investorId",
  getInvestorTransactions
);

router.post("/purchase", purchaseFund);

router.post("/redeem", redeemFund);

export default router;