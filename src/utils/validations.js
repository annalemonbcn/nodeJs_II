import userModel from "../dao/models/userModel.js";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const validateUniqueEmail = async (email) => {
  const existingUser = await userModel.findOne({ email });
  return !existingUser;
};

const validateStrongPassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~]{8,}$/;

  return passwordRegex.test(password);
};

export { validateEmail, validateUniqueEmail, validateStrongPassword };
