import jwt from "jsonwebtoken";
import "dotenv/config";
import { userDTO } from "../dto/user.dto.js";
import { sessionsDAO } from "../dao/factory.js";

const SECRET = process.env.JWT_SECRET;

class sessionDBManager {
  constructor(dao) {
    this.dao = dao;
  }

  async register(userData) {
    const newUser = await this.dao.createUser(userData);
    return userDTO(newUser);
  }

  async login(user) {
    const cleanUser = userDTO(user);
    const token = jwt.sign(cleanUser, SECRET, { expiresIn: "1h" });
    return token;
  }

  async getCurrentUser(id) {
    const user = await this.dao.getUserById(id);
    return userDTO(user);
  }
}

export const SessionServiceWithDAO = new sessionDBManager(new sessionsDAO());
