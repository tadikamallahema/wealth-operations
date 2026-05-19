import { Router } from "express";

import {
  getAllSips,
  getSipById,
  getInvestorSips,
  createSip,
  pauseSip,
  resumeSip,
  cancelSip
} from "../controllers/sips.controller";

const router = Router();

router.get("/", getAllSips);

router.get("/:sipId", getSipById);

router.get(
  "/investor/:investorId",
  getInvestorSips
);

router.post("/", createSip);

router.patch("/:sipId/pause", pauseSip);

router.patch("/:sipId/resume", resumeSip);

router.delete("/:sipId/cancel", cancelSip);

export default router;