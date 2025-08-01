import { Router } from "express";
import "dotenv/config";
import {
  loginController,
  registerController,
} from "../controllers/sessions.controller.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
