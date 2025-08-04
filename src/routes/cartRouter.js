import { Router } from "express";
import {
  addProductToCartController,
  createCartController,
  deleteCartController,
  deleteProductFromCartController,
  getCartByIdController,
  replaceProductsFromCartController,
  updateProductQuantityController,
} from "../controllers/cart.controller.js";
import { authenticateJwt, authorizeRoles } from "../middlewares/index.js";

const router = Router();

router.get("/:cid", getCartByIdController);
router.post("/", createCartController);
router.post(
  "/:cid/product/:pid",
  authenticateJwt,
  authorizeRoles("user"),
  addProductToCartController
);
router.delete("/:cid/product/:pid", deleteProductFromCartController);
router.put("/:cid", replaceProductsFromCartController);
router.put("/:cid/product/:pid", updateProductQuantityController);
router.delete("/:cid", deleteCartController);

export default router;
