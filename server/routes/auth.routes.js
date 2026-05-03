import express from "express";
import { login, logout, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { loginValidator } from "../validators/login.validator.js";

const router = express.Router();

// POST /auth/login  → genera sesión y cookie
router.post("/login",loginValidator, login);

// POST /auth/logout → elimina la cookie
router.post("/logout", logout);

// GET  /auth/me     → devuelve el usuario actual (ruta protegida)
router.get("/me", requireAuth, me);

export default router;