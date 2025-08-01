import { Router } from "express";
import { productDBManager } from "../dao/productDBManager.js";
import { cartDBManager } from "../dao/cartDBManager.js";
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
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

router.get("/:cid", getCartByIdController);

router.post("/", createCartController);

router.post("/:cid/product/:pid", addProductToCartController);

router.delete("/:cid/product/:pid", deleteProductFromCartController);

router.put("/:cid", replaceProductsFromCartController);

router.put("/:cid/product/:pid", updateProductQuantityController);

router.delete("/:cid", deleteCartController);

export default router;
