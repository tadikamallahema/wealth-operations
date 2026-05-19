import { Router } from "express";

import {
  getAllFunds,
  getFundById,
  getFundNAV,
  getFundNAVHistory
} from "../controllers/funds.controller";

const router = Router();

router.get("/", getAllFunds);

router.get("/:fundId", getFundById);

router.get("/:fundId/nav", getFundNAV);

router.get("/:fundId/nav/history", getFundNAVHistory);

export default router;