import jwt from "jsonwebtoken";
import "dotenv/config";
import { sessionsDAO } from "../dao/sessionDAO.js";

const SECRET = process.env.JWT_SECRET;

class sessionDBManager {
  constructor(dao) {
    this.dao = dao;
  }

  #cleanUser(user) {
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;
    delete userObj.createdAt;
    delete userObj.updatedAt;
    delete userObj.__v;
    return userObj;
  }

  async register(userData) {
    const newUser = await this.dao.createUser(userData);
    return this.#cleanUser(newUser);
  }

  async login(user) {
    const cleanUser = this.#cleanUser(user);
    const token = jwt.sign(cleanUser, SECRET, { expiresIn: "1h" });
    return token;
  }

  async getCurrentUser(id) {
    return await this.dao.getUserById(id);
  }
}

export const SessionServiceWithDAO = new sessionDBManager(new sessionsDAO());
