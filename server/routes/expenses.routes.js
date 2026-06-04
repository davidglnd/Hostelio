import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { addExpenses, getAllExpenses, deleteAllExpensesByUserId } from "../controllers/expenses.controller.js";

import Expense from "../models/Expense.js";

const router = express.Router();

router.post("/", requireAuth, addExpenses);
router.get("/", requireAuth, getAllExpenses);
router.delete("/", requireAuth, deleteAllExpensesByUserId);
router.post("/bulk", requireAuth, async (req, res) => {
  const expenses = req.body.map(e => ({ ...e, idUser: req.user.id }));
  await Expense.insertMany(expenses);
  res.status(201).json({ inserted: expenses.length });
});

export default router;