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

const router = Router();

router.get("/:cid", getCartByIdController);
router.post("/", createCartController);
router.post("/:cid/product/:pid", addProductToCartController);
router.delete("/:cid/product/:pid", deleteProductFromCartController);
router.put("/:cid", replaceProductsFromCartController);
router.put("/:cid/product/:pid", updateProductQuantityController);
router.delete("/:cid", deleteCartController);

export default router;
