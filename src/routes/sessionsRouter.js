import "dotenv/config";
import { Router } from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../controllers/sessions.controller.js";
import { authenticateJwt, authenticateWithCallback } from "../middlewares/index.js";

const router = Router();

router.post(
  "/register",
  authenticateWithCallback("register"),
  registerController
);
router.post(
  "/login",
  authenticateWithCallback("login"),
  loginController
);
router.get("/current", authenticateJwt, getCurrentUserController);

export default router;
