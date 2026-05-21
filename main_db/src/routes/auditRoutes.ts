import express from "express";
import { createAudit, listAudits } from "../controller/auditController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
//import { authorize } from "../middleware/authorize.js";

const router = express.Router();

// Create audit entry (internal use) - require auth
router.post("/", verifyToken, createAudit);

// List audits - only Compliance or Admin
router.get("/" ,/*  verifyToken, authorize("Compliance_officer", "Admin"), */  listAudits);

export default router;
