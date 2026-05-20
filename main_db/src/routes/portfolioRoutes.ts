import express from "express";
import { getPortfolio } from "../controller/portfolioController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

const portfolioRoutes = express.Router();

portfolioRoutes.get(
  "/",
  verifyToken,
  authorize("Compliance_officer", "Admin"),
  getPortfolio
);

export default portfolioRoutes;
 