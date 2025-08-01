import { Router } from "express";
import "dotenv/config";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../controllers/sessions.controller.js";
import { authenticateJwt } from "../middlewares/index.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/current", authenticateJwt, getCurrentUserController);

export default router;
