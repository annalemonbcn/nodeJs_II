import { Router } from "express";
import { uploader } from "../utils/multerUtil.js";
import {
  getAllProductsController,
  getProductByIDController,
  createProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProductsController);
router.get("/:pid", getProductByIDController);
router.post("/", uploader.array("thumbnails", 3), createProductController);
router.put("/:pid", uploader.array("thumbnails", 3), updateProductController);
router.delete("/:pid", deleteProductController);

export default router;
