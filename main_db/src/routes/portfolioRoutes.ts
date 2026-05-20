import express from "express";
import { getPortfolio } from "../controller/portfolioController.js";

const portfolioRoutes = express.Router();

portfolioRoutes.get("/", getPortfolio);

export default portfolioRoutes;
