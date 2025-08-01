import { sessionDBManager } from "../services/sessions.services.js";

const SessionService = new sessionDBManager();

const registerController = async (req, res, next) => {
  passport.authenticate(
    "register",
    { session: false },
    async (error, user, info) => {
      if (error) return next(error);
      if (!user) {
        return res
          .status(400)
          .json({ status: "error", code: 400, message: info.message });
      }

      const result = SessionService.handleSuccessfulRegister(user);

      return res.status(201).json({
        status: "success",
        code: 201,
        message: "User successfully created",
        payload: result,
      });
    }
  )(req, res, next);
};

const loginController = (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (error, user, info) => {
      if (error) return next(error);
      if (!user) {
        return res
          .status(401)
          .json({ status: "error", code: 401, message: info.message });
      }

      const token = SessionService.handleSuccessfulLogin(user);

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "User successfully logged in",
        payload: { token },
      });
    }
  )(req, res, next);
};

export { registerController, loginController };
