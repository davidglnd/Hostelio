import express from "express";
import { login, logout, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { loginValidator } from "../validators/login.validator.js";

const router = express.Router();

// POST /auth/login  
router.post("/login",loginValidator, login);

// POST /auth/logout 
router.post("/logout", logout);

// GET  /auth/me  
router.get("/me", requireAuth, me);

export default router;