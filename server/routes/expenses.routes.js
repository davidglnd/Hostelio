import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

import { addExpenses } from "../controllers/expenses.controller.js";

const router = express.Router();

router.post("/", requireAuth, addExpenses);

export default router;