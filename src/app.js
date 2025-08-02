import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import config from "./config/config.js";
import passport from "passport";
import { startPassport } from "./passport/config.js";
import indexRouter from "./routes/index.js";

import __dirname from "./utils/constantsUtil.js";

const app = express();
const PORT = config.PORT;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

startPassport();
app.use(passport.initialize());

//Handlebars Config
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/../views");
app.set("view engine", "handlebars");

//Router
app.use(indexRouter);

const startServer = async () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
};

startServer();
