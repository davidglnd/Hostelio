import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { updateProfile, deleteProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/me", requireAuth, updateProfile);
router.delete("/me", requireAuth, deleteProfile);

export default router;