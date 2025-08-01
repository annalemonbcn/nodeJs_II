import { Router } from "express";
import productRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";
import sessionsRouter from "./sessionsRouter.js";
import viewsRouter from "./viewsRouter.js";

const router = Router();

router.use("/api/products", productRouter);
router.use("/api/carts", cartRouter);
router.use("/api/sessions", sessionsRouter);
router.use("/", viewsRouter);

export default router;
