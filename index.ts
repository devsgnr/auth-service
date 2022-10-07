import express, { Express } from "express";
import env from "./utils/env";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";

/* DB Imports */
import db from "./utils/config/mongodb";

/*  Routers Import */
import Routers from "./app/routes";

/* Setup topmost layer of the application server -*/
const app: Express = express();
const port = env.node_env === "DEV" ? env.port.dev : env.port.prod;

/* Mongoose Config */
mongoose.Promise = global.Promise;

mongoose
  .connect(db.url, { ignoreUndefined: false })
  .then(() => {
    console.log(`⚡️DB running - in ${env.node_env} environment`);
  })
  .catch((error) => {
    console.log({ message: "DB Connection unsuccessfull", error });
  });

/* Middleware */

/* Body Parser - for urlencoded and JSON */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* CORS - Cross Origin Resources Sharing */
app.use(cors());

/* Helmet Config */
app.use(helmet());

/* Route Middleware */
/* Index Routes */
app.use(Routers);

/* Start Server */
app.listen(port, () => {
  console.log(`⚡️Server running in ${env.node_env} environment => ${port}`);
});
