const express = require("express");
const CORS = require("cors");

const userRouter = require('./users/user.routers')
require("dotenv").config();

module.exports = class UsersServer {
  constructor() {
    this.server = null;
  }
  start() {
    this.initServer();
    this.initMiddleware();
    this.initRouters();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(CORS({ origin: "http://localhost:3000" }));
  }

  initRouters() {
    this.server.use("/users", userRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("Started on port", process.env.PORT);
    });
  }
};
