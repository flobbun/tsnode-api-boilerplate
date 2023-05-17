import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import config from "./configurations/config";
import { logger } from "./middlewares/logger.middleware";
import RouterModule from "./modules/router.module";
import http from "http";
import { LogTypesEnum } from "./constants/logTypes.enum";
import { LogsService } from "./services/http/logs.service";

class Server {
  app: express.Application = express();

  constructor() {
    this.config();
    this.routes();
    this.startServer();
    this.startDB();
  }

  config() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", config.ORIGIN);
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );

      this.app.use(cors());
      next();
    });
    this.app.use(express.json());
  }

  routes() {
    this.app.all("*", logger);
    new RouterModule(this.app);
  }

  startDB() {
    connect(config.MONGODB_URI as string)
      .then(this.onDatabaseConnected)
      .catch((err) => LogsService.log(err, "error"));
  }

  startServer() {
    this.app.listen(config.PORT, this.onServerListening);
  }

  onDatabaseConnected() {
    LogsService.log("Connected to MongoDB", LogTypesEnum.INFO);
  }

  onServerListening() {
    LogsService.log(`Listening on port ${config.PORT}`, LogTypesEnum.INFO);
  }
}

const server = new Server();
export { server as Server };
