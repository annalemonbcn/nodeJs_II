import { SessionServiceWithDAO } from "../services/sessionDBManager.js";

const registerController = async (req, res, next) => {
  const user = req.user;
  const result = await SessionServiceWithDAO.register(user);

  return res.status(201).json({
    status: "success",
    code: 201,
    message: "User successfully created",
    payload: result,
  });
};

const loginController = async (req, res, next) => {
  const user = req.user;
  const token = await SessionServiceWithDAO.login(user);

  return res.status(200).json({
    status: "success",
    code: 200,
    message: "User successfully logged in",
    payload: { token },
  });
};

const getCurrentUserController = async (req, res, next) => {
  const { _id } = req.user;
  const user = await SessionServiceWithDAO.getCurrentUser(_id);

  res.status(200).json({
    status: "success",
    code: 200,
    payload: user,
  });
};

export { registerController, loginController, getCurrentUserController };
