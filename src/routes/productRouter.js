import { Router } from "express";
import { uploader } from "../utils/multerUtil.js";
import {
  getAllProductsController,
  getProductByIDController,
  createProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/products.controller.js";
import { authenticateJwt, authorizeRoles } from "../middlewares/index.js";

const router = Router();

router.get("/", getAllProductsController);
router.get("/:pid", getProductByIDController);
router.post(
  "/",
  uploader.array("thumbnails", 3),
  authenticateJwt,
  authorizeRoles("admin"),
  createProductController
);
router.put(
  "/:pid",
  uploader.array("thumbnails", 3),
  authenticateJwt,
  authorizeRoles("admin"),
  updateProductController
);
router.delete(
  "/:pid",
  authenticateJwt,
  authorizeRoles("admin"),
  deleteProductController
);

export default router;
