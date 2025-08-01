import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET;

const cleanUser = (user) => {
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;
  delete userObj.createdAt;
  delete userObj.updatedAt;
  delete userObj.__v;
  return userObj;
};

const handleSuccessfulRegister = (user) => {
  return cleanUser(user);
};

const handleSuccessfulLogin = (user) => {
  const clean = cleanUser(user);
  return jwt.sign(clean, SECRET, { expiresIn: "1h" });
};

const authServices = {
  handleSuccessfulRegister,
  handleSuccessfulLogin,
};

export { authServices };
