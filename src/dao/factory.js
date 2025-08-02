import "dotenv/config";
import connectToDatabase from "../db/config/index.js";

const PERSISTENCE = process.env.PERSISTENCE;

let sessionsDAO;
let productsDAO;
let cartDAO;

switch (PERSISTENCE) {
  case "MONGO":
    connectToDatabase()
    sessionsDAO = (await import("./mongodb/sessionDAO.js")).sessionsDAO;
    productsDAO = (await import("./mongodb/productsDAO.js")).productsDAO;
    cartDAO = (await import("./mongodb/cartDAO.js")).cartDAO;
    break;
  default:
    throw new Error("Unsupported persistence type");
}

export { sessionsDAO, productsDAO, cartDAO };
