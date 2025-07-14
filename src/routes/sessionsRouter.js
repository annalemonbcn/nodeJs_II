import { Router } from "express";
import { authenticateJwt } from "../middlewares/index.js";
import userModel from "../dao/models/userModel.js";

const router = Router();

router.get("/current", authenticateJwt, async (req, res) => {
  const { _id } = req.user;

  const user = await userModel
    .findById(_id)
    .select("-password -createdAt -updatedAt -__v");

  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    payload: user,
  });
});

export default router;
