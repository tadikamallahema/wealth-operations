import { Router } from "express";

import {
  getAllInvestors,
  getInvestorById,
  getInvestorByPAN,
  getInvestorHoldings,
  getInvestorHoldingByFund,
  getPortfolioSummary
} from "../controllers/investors.controller";

const router = Router();

router.get("/", getAllInvestors);

router.get(
  "/pan/:panNumber",
  getInvestorByPAN
);

router.get("/:investorId", getInvestorById);

router.get(
  "/:investorId/holdings",
  getInvestorHoldings
);

router.get(
  "/:investorId/holdings/:fundId",
  getInvestorHoldingByFund
);

router.get(
  "/:investorId/portfolio-summary",
  getPortfolioSummary
);

export default router;