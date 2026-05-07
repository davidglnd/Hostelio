import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

import { addExpenses } from "../controllers/expenses.controller.js";
import { getAllExpenses } from "../controllers/expenses.controller.js";
import { get } from "http";

const router = express.Router();

router.post("/", requireAuth, addExpenses);

router.get("/", requireAuth, getAllExpenses);

export default router;