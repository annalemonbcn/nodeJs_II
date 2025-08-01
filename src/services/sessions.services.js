import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET;

class sessionDBManager {
  #cleanUser(user) {
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;
    delete userObj.createdAt;
    delete userObj.updatedAt;
    delete userObj.__v;
    return userObj;
  }

  handleSuccessfulRegister(user) {
    return this.#cleanUser(user);
  }

  handleSuccessfulLogin(user) {
    const clean = this.#cleanUser(user);
    return jwt.sign(clean, SECRET, { expiresIn: "1h" });
  }
}

export { sessionDBManager };
