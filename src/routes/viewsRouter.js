import { Router } from "express";
import {
  viewProductsController,
  viewRealTimeProductsController,
  viewCartController,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/products", viewProductsController);
router.get("/realtimeproducts", viewRealTimeProductsController);
router.get("/cart/:cid", viewCartController);

export default router;
